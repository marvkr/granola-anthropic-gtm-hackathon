# Granola x Anthropic GTM & Marketing Hackathon

Every call makes the next deck better. Record a pitch or sales call in Granola. Claude reads the transcript and finds the slides the listener kept asking about. It then writes the next deck version, with clearer slide copy and stronger speaker notes.

- **When:** 20 October 2026, 5:30 PM PDT
- **Where:** 363 Clementina St, San Francisco

## How the loop works

1. Present the current deck on a call that Granola records.
2. Run `/revise-deck-from-call` in Claude Code.
3. Claude reads the transcript through the Granola MCP server and lists each question the listener asked.
4. Claude matches each question to the slide on screen at that moment. Many questions on one slide, a follow-up question, or "what do you mean" marks that slide as unclear.
5. Claude writes `slides/<deck>-v<N+1>/` and a report in `feedback/`. An unclear slide gets new copy. A clear slide that still drew "why" or "how" questions gets new speaker notes.

## Deck versions

Every call adds one version: V1, V2, V3 and so on. Nothing overwrites an older version.

| Piece | Where |
| --- | --- |
| The slides of version N | `slides/<deck>-vN/index.tsx` |
| Which call produced each version | `versions/<deck>.json` |
| The frozen release of version N | git tag `<deck>-vN` |

| Command | What it does |
| --- | --- |
| `npm run deck:next -- anthropic --meeting "<title>" --meeting-date <date>` | Copies the latest version to the next number and records the call |
| `npm run deck:list -- anthropic` | Lists every version, its call, and whether it is tagged |
| `npm run deck:tag -- anthropic` | Tags and pushes each untagged version; run it on `main` after the merge |
| `npm run deck:check` | Fails if a tagged version changed. CI runs it on every pull request. |

To see what one call changed, run `git diff --no-index slides/anthropic-v1 slides/anthropic-v2`.

## Run the deck

```bash
npm install
npm run dev
```

Open `http://localhost:5173/s/anthropic-v1`. Press `F` to present.

## Connect Granola

`.mcp.json` registers Granola's hosted MCP server at `https://mcp.granola.ai/mcp`. Claude Code asks you to sign in to Granola the first time it uses the server.

## Run the loop automatically

Granola sends a `note.generated` webhook when it finishes the notes for a call. `scripts/granola.mjs` receives it, saves the transcript to `transcripts/` with listeners anonymized, and runs `update_deck.py` on it. Webhooks and API keys need a Granola Business or Enterprise plan.

1. In the Granola desktop app, create an API key under Settings → Connectors → API keys. Put it in `.env` as `GRANOLA_API_KEY`, next to `ANTHROPIC_API_KEY`.
2. Start the receiver and expose it over HTTPS, for example with ngrok:

   ```bash
   node scripts/granola.mjs serve --revise   # listens on :8787
   ngrok http 8787
   ```

3. In Granola, open Settings → Connectors → Webhooks, add the ngrok URL, and subscribe to `note.generated`. Put the `whsec_...` signing secret in `.env` as `GRANOLA_WEBHOOK_SECRET`. Granola shows it only once.

To pull one call by hand, run `node scripts/granola.mjs note <note_id>`. `transcripts/fixtures/` holds a simulated call on V3 in the Granola API's note format, so the conversion runs without a Granola account:

```bash
node scripts/granola.mjs note --file transcripts/fixtures/simulated-customer-call-v3.json --simulated \
  --out transcripts/2026-10-20-simulated-customer-call-v3.md
```

## The demo deck

`slides/anthropic-v1` is a demo deck about Anthropic. Every figure comes from a public source, and the speaker notes name each source. It is not an Anthropic document.

## Deck updater script

`update_deck.py` runs the same loop without Claude Code, using an Anthropic API key. It sends the latest deck version, a call transcript, `context/style-guide.md`, and the `revise-deck-from-call` and `slide-authoring` skills to Claude. It then writes the feedback report, runs `npm run deck:next`, and applies Claude's edits to the new version.

```bash
pip3 install -r requirements.txt
cp .env.example .env   # paste the API key into .env; it's gitignored, never commit it
python3 update_deck.py --meeting meetings/2026-10-20-anthropic-v1-vc-call.md
```

`meetings/2026-10-20-anthropic-v1-vc-call.md` is a sample VC call in which the V1 deck is presented. Its people and firm are made up.

## Layout

| Path | Contents |
| --- | --- |
| `slides/<deck>-v<N>/index.tsx` | One deck version: the pages, the styles and the `notes` export |
| `.claude/skills/revise-deck-from-call/` | The skill that turns a call into the next version |
| `feedback/` | One report per call: each question, its slide and the fix |
| `.mcp.json` | The Granola MCP server |
| `scripts/granola.mjs` | Fetches a Granola note into `transcripts/`, and the webhook receiver that runs the loop |
| `versions/`, `scripts/deck-version.mjs` | The version registry and the script that creates, tags and checks versions |
| `meetings/`, `context/`, `update_deck.py` | Sample call transcripts, the style guide, and the API-key script that runs the loop |
