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

Each version is its own folder, so `git diff --no-index slides/anthropic-v1 slides/anthropic-v2` shows exactly what the call changed.

## Run the deck

```bash
npm install
npm run dev
```

Open `http://localhost:5173/s/anthropic-v1`. Press `F` to present.

## Connect Granola

`.mcp.json` registers Granola's hosted MCP server at `https://mcp.granola.ai/mcp`. Claude Code asks you to sign in to Granola the first time it uses the server.

## The demo deck

`slides/anthropic-v1` is a demo deck about Anthropic. Every figure comes from a public source, and the speaker notes name each source. It is not an Anthropic document.

## Layout

| Path | Contents |
| --- | --- |
| `slides/<deck>-v<N>/index.tsx` | One deck version: the pages, the styles and the `notes` export |
| `.claude/skills/revise-deck-from-call/` | The skill that turns a call into the next version |
| `feedback/` | One report per call: each question, its slide and the fix |
| `.mcp.json` | The Granola MCP server |
