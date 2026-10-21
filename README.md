# Granola x Anthropic GTM & Marketing Hackathon

GTM and marketing hackathon by Granola and Anthropic.

- **When:** 20 October 2026, 5:30 PM PDT
- **Where:** 363 Clementina St, San Francisco

## Deck updater

Takes investor meeting notes from Granola, the current deck (slides and speaker
notes) and a style guide, and asks Claude to write the next version of the deck
for the follow-up meeting.

- `deck/deck.md`: the current deck (Markdown, slides split by `---`, speaker notes in `<!-- -->`)
- `context/style-guide.md`: how the deck should look and sound
- `meetings/`: Granola meeting notes
- `update_deck.py`: writes `deck/versions/deck-vN.md` plus a changelog, and prints the changelog

```bash
pip3 install -r requirements.txt
cp .env.example .env   # paste the API key into .env; it's gitignored, never commit it
python3 update_deck.py --meeting meetings/sample-investor-meeting.md
```
