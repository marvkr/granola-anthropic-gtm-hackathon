"""Write the next version of an Open Slide deck from a recorded call, using Claude.

Inputs:  the latest deck version (slides/<deck>-vN/index.tsx, with its `notes`
         export), a Granola call transcript, the style guide, and the
         revise-deck-from-call and slide-authoring skills as the method.
Output:  slides/<deck>-v<N+1>/ (created with `npm run deck:next`), plus a
         feedback report in feedback/ listing each question and its fix.

Usage:
    cp .env.example .env   # then paste your key into .env
    python3 update_deck.py --meeting meetings/2026-10-20-anthropic-v1-vc-call.md
"""

from __future__ import annotations

import argparse
import json
import os
import re
import subprocess
import sys
from pathlib import Path

import anthropic

MODEL = "claude-opus-5-5"
ROOT = Path(__file__).parent
METHOD = ROOT / ".claude/skills/revise-deck-from-call/SKILL.md"
AUTHORING = ROOT / ".agents/skills/slide-authoring/SKILL.md"

SYSTEM_PROMPT = """\
You revise pitch decks after investor calls. The deck is an Open Slide deck: one \
React file, index.tsx, whose default export is the page array and whose `notes` \
export holds the speaker notes, index-aligned with the pages.

Follow the method in <method> for reading the call and deciding fixes: find the \
listener's questions, match each one to a slide, and choose between rewriting \
slide copy and rewriting speaker notes. Its steps about the Granola MCP, git, npm \
and pull requests are done for you by the calling script; skip them. Follow \
<slide_authoring_rules> for every page edit, and <style_guide> for voice.

Rules:
- Apply only the fixes your report lists. Keep the page order unless a fix needs \
a new page, and keep `notes` aligned with the pages.
- Never invent a figure. A new number must come from the call, where the \
presenter said it, or already be in the deck or its notes. Otherwise write a \
`TODO:` line in the notes.
- Every page must still fit the 1920 x 1080 canvas. Prefer shorter copy.
- Leave meta.title and meta.createdAt alone; the script stamps them.
- The repository is public: in the report call each listener "Listener 1", \
"Listener 2" and so on.

Respond with exactly these two sections and nothing else:

<report>
The Markdown feedback report from step 6 of the method: a title line, one table \
(slide, questions with timestamps quoted word for word, signal, fix), then a \
"Candidate new slides" list and a "Data needed" list of every TODO you added.
</report>

<edits>
One <edit> per change to index.tsx:
<edit><find>exact text copied from the current file</find><replace>new text</replace></edit>
Each <find> must match exactly one place in the file, character for character. \
Keep each <find> as short as it can be while staying unique.
</edits>
"""


def load_dotenv(path: Path = ROOT / ".env") -> None:
    """Load KEY=value lines from .env without overriding the real environment."""
    if not path.exists():
        return
    for line in path.read_text().splitlines():
        key, sep, value = line.partition("=")
        if sep and not line.lstrip().startswith("#"):
            os.environ.setdefault(key.strip(), value.strip())


def frontmatter_field(text: str, field: str) -> str | None:
    match = re.search(rf'^{field}:\s*"?(.*?)"?\s*$', text, re.MULTILINE)
    return match.group(1) if match else None


def slugify(text: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")


def build_user_message(deck_source: str, meeting: str, style: str) -> str:
    return (
        f"<method>\n{METHOD.read_text()}\n</method>\n\n"
        f"<slide_authoring_rules>\n{AUTHORING.read_text()}\n</slide_authoring_rules>\n\n"
        f"<style_guide>\n{style}\n</style_guide>\n\n"
        f"<current_deck_index_tsx>\n{deck_source}\n</current_deck_index_tsx>\n\n"
        f"<call>\n{meeting}\n</call>\n\n"
        "Write the feedback report and the edits for the next deck version."
    )


def ask_claude(user_message: str) -> str:
    client = anthropic.Anthropic()
    with client.beta.messages.stream(
        model=MODEL,
        max_tokens=64000,
        system=SYSTEM_PROMPT,
        thinking={"type": "adaptive"},
        output_config={"effort": "high"},
        # If a safety classifier declines, retry on a fallback model in the same call.
        betas=["server-side-fallback-2026-07-01"],
        extra_body={"fallbacks": "default"},
        messages=[{"role": "user", "content": user_message}],
    ) as stream:
        response = stream.get_final_message()

    if response.stop_reason == "refusal":
        raise RuntimeError(f"Claude declined the request: {response.stop_details}")
    if response.stop_reason == "max_tokens":
        raise RuntimeError("Response hit max_tokens before the edits were complete")
    return "".join(block.text for block in response.content if block.type == "text")


def extract_section(text: str, tag: str) -> str:
    match = re.search(rf"<{tag}>\s*(.*?)\s*</{tag}>", text, re.DOTALL)
    if not match:
        raise ValueError(f"Claude's response had no <{tag}> section")
    return match.group(1)


def apply_edits(source: str, edits_xml: str) -> tuple[str, int]:
    edits = re.findall(r"<edit>\s*<find>(.*?)</find>\s*<replace>(.*?)</replace>\s*</edit>",
                       edits_xml, re.DOTALL)
    if not edits:
        raise ValueError("Claude's response had no edits")
    for find, replace in edits:
        count = source.count(find)
        if count != 1:
            raise ValueError(f"An edit's <find> matched {count} places, expected 1:\n{find[:300]}")
        source = source.replace(find, replace)
    return source, len(edits)


def npm(*args: str) -> str:
    return subprocess.run(["npm", "run", "--silent", *args], cwd=ROOT, check=True,
                          capture_output=True, text=True).stdout.strip()


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    parser.add_argument("--meeting", required=True, help="Granola call transcript (Markdown)")
    parser.add_argument("--deck", default="anthropic", help="deck name in versions/<deck>.json")
    parser.add_argument("--style", default="context/style-guide.md")
    args = parser.parse_args()
    load_dotenv()

    registry = json.loads((ROOT / f"versions/{args.deck}.json").read_text())
    latest = registry["versions"][-1]
    deck_source = (ROOT / latest["folder"] / "index.tsx").read_text()
    meeting = Path(args.meeting).read_text()
    title = frontmatter_field(meeting, "title") or Path(args.meeting).stem
    date = frontmatter_field(meeting, "date") or "undated"

    print(f"Revising {latest['folder']} from {args.meeting} with {MODEL}...", file=sys.stderr)
    try:
        text = ask_claude(build_user_message(deck_source, meeting, Path(args.style).read_text()))
    except anthropic.AuthenticationError:
        print("Authentication failed: put ANTHROPIC_API_KEY in .env.", file=sys.stderr)
        return 1
    except anthropic.RateLimitError:
        print("Rate limited by the Anthropic API; try again shortly.", file=sys.stderr)
        return 1
    except anthropic.APIStatusError as e:
        print(f"Anthropic API error {e.status_code}: {e.message}", file=sys.stderr)
        return 1
    except anthropic.APIConnectionError:
        print("Could not reach the Anthropic API.", file=sys.stderr)
        return 1

    report = extract_section(text, "report")
    # Apply the edits to v<N> first, so a bad edit fails before any files are written.
    revised, edit_count = apply_edits(deck_source, extract_section(text, "edits"))

    report_path = ROOT / "feedback" / f"{date}-{slugify(title)}.md"
    report_path.write_text(report + "\n")
    new_folder = npm("deck:next", "--", args.deck, "--meeting", title,
                     "--meeting-date", date, "--report", str(report_path.relative_to(ROOT)))
    new_entry = ROOT / new_folder.splitlines()[-1] / "index.tsx"

    # deck:next stamped the copied file's title and createdAt; keep those stamps.
    stamped = new_entry.read_text()
    for pattern in (r'title: ".*? V\d+"', r'createdAt: "[^"]*"'):
        revised = re.sub(pattern, re.search(pattern, stamped).group(0), revised, count=1)
    new_entry.write_text(revised)

    print(report)
    print(f"\nApplied {edit_count} edits. New version: {new_entry.parent.relative_to(ROOT)}", file=sys.stderr)
    print(f"Report: {report_path.relative_to(ROOT)}", file=sys.stderr)
    return 0


if __name__ == "__main__":
    sys.exit(main())
