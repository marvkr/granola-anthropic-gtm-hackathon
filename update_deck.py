"""Update a code-based pitch deck from investor meeting notes using Claude.

Inputs:  the current deck (slides + speaker notes), Granola meeting notes,
         and a style guide describing how the deck should look and sound.
Output:  a new deck version plus a changelog explaining each change.

Usage:
    cp .env.example .env   # then paste your key into .env
    python3 update_deck.py
    python3 update_deck.py --meeting meetings/other.md --deck deck/deck.md
"""

from __future__ import annotations

import argparse
import os
import re
import sys
from pathlib import Path

import anthropic

MODEL = "claude-opus-5-5"

SYSTEM_PROMPT = """\
You revise startup pitch decks between investor meetings.

You get three documents: the founder's style guide, the current deck (written in \
Markdown, with speaker notes in HTML comments), and notes from the last investor \
meeting. Produce the next version of the deck for the follow-up meeting.

How to revise:
- Address every concern and explicit request the investor raised. Reorder, \
rewrite, add or remove slides as needed.
- Keep what resonated with the investor. Don't churn slides that weren't discussed.
- Follow the style guide exactly, including its format rules.
- Update speaker notes on every changed slide so the founder knows what to say \
and which piece of feedback the slide answers. Pull in useful points from the \
founder's personal notes in the meeting file.
- Never invent metrics, customers or quotes. Where the investor asked for data \
the deck doesn't have, add a clearly marked placeholder such as \
[TODO: weekly active seats by cohort] and list it in the changelog.

Respond with exactly two sections and nothing else:

<changelog>
A short Markdown changelog: one bullet per change, each naming the slide and the \
investor feedback it addresses. End with a "Data needed" list of every TODO \
placeholder.
</changelog>

<deck>
The complete new deck file, ready to save. Not a diff.
</deck>
"""


def load_dotenv(path: Path = Path(__file__).parent / ".env") -> None:
    """Load KEY=value lines from .env without overriding the real environment."""
    if not path.exists():
        return
    for line in path.read_text().splitlines():
        key, sep, value = line.partition("=")
        if sep and not line.lstrip().startswith("#"):
            os.environ.setdefault(key.strip(), value.strip())


def build_user_message(style: str, deck: str, meeting: str) -> str:
    return (
        f"<style_guide>\n{style}\n</style_guide>\n\n"
        f"<current_deck>\n{deck}\n</current_deck>\n\n"
        f"<meeting_notes>\n{meeting}\n</meeting_notes>\n\n"
        "Write the next version of the deck for the follow-up meeting."
    )


def extract_section(text: str, tag: str) -> str:
    match = re.search(rf"<{tag}>\s*(.*?)\s*</{tag}>", text, re.DOTALL)
    if not match:
        raise ValueError(f"Claude's response had no <{tag}> section")
    return match.group(1)


def next_version_path(deck_path: Path) -> Path:
    versions_dir = deck_path.parent / "versions"
    versions_dir.mkdir(exist_ok=True)
    existing = [int(m.group(1)) for p in versions_dir.glob(f"{deck_path.stem}-v*.md")
                if (m := re.search(r"-v(\d+)\.md$", p.name))]
    # The working deck is v1, so the first generated version is v2.
    return versions_dir / f"{deck_path.stem}-v{max(existing, default=1) + 1}.md"


def update_deck(style: str, deck: str, meeting: str) -> tuple[str, str]:
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
        messages=[{"role": "user", "content": build_user_message(style, deck, meeting)}],
    ) as stream:
        response = stream.get_final_message()

    if response.stop_reason == "refusal":
        raise RuntimeError(f"Claude declined the request: {response.stop_details}")
    if response.stop_reason == "max_tokens":
        raise RuntimeError("Response hit max_tokens before the deck was complete")

    text = "".join(block.text for block in response.content if block.type == "text")
    return extract_section(text, "changelog"), extract_section(text, "deck")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    parser.add_argument("--meeting", default="meetings/sample-investor-meeting.md")
    parser.add_argument("--deck", default="deck/deck.md")
    parser.add_argument("--style", default="context/style-guide.md")
    args = parser.parse_args()
    load_dotenv()

    deck_path = Path(args.deck)
    style = Path(args.style).read_text()
    deck = deck_path.read_text()
    meeting = Path(args.meeting).read_text()

    print(f"Updating {deck_path} from {args.meeting} with {MODEL}...", file=sys.stderr)
    try:
        changelog, new_deck = update_deck(style, deck, meeting)
    except anthropic.AuthenticationError:
        print("Authentication failed: set ANTHROPIC_API_KEY.", file=sys.stderr)
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

    out_path = next_version_path(deck_path)
    out_path.write_text(new_deck + "\n")
    out_path.with_name(out_path.stem + "-changelog.md").write_text(changelog + "\n")

    print(changelog)
    print(f"\nNew deck written to {out_path}", file=sys.stderr)
    return 0


if __name__ == "__main__":
    sys.exit(main())
