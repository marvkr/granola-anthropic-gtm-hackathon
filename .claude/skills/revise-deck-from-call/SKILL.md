---
name: revise-deck-from-call
description: Turn a recorded Granola call into the next version of a pitch or sales deck. Reads the call transcript through the Granola MCP, finds the slides the listener kept asking about, and writes slides/<deck>-v<N+1> with clearer slide copy and stronger speaker notes. Use after a pitch or sales call, or when the user says "update the deck from the call", "make v2 from the meeting", "what was unclear on the call", or "revise the deck".
---

# Revise the deck from a call

A question from the listener is a signal. When the listener asks about a topic, the slide on that topic did not land. Many questions on one topic, or a follow-up to an answer, mean the slide or the talk track needs work. This skill turns those signals into the next deck version.

Read the `slide-authoring` skill before you edit any page. It owns the 1920 × 1080 canvas rules, the vertical budget and the `notes` export.

## 1. Get the call

- Use the Granola MCP server from `.mcp.json`. Check the tool list first. Third-party listings name these tools: `list_meetings`, `get_meetings`, `query_granola_meetings` and `get_meeting_transcript`.
- Take the meeting the user names. If the user names none, take the most recent meeting.
- Get the full transcript with speaker labels. If the transcript is not available, use the meeting notes. Say that in the report, because notes lose most of the questions.

## 2. Load the current deck

- The deck is the folder `slides/<deck>-v<N>/` with the highest `N`. Each version is one `index.tsx`.
- For each page, record the slide number, the headline, the words on the page and its entry in the `notes` export.

## 3. Find the listener's questions

- The presenter is the person who talks through the slides. Every other speaker is a listener.
- Keep every listener turn that asks for something: a question mark, or an opener such as "what", "how", "why", "can you", "does that mean" or "so is it".
- Mark a turn as confusion when the listener says "I don't follow", "what do you mean", "say that again", "sorry" or "wait".
- Keep the timestamp and the exact words of each turn.

## 4. Match each question to a slide

- Match a question to the slide the presenter was on: the closest earlier presenter turn whose words match that slide's headline, figures or notes.
- If no presenter turn matches, match on the topic of the question.
- A question about a topic that no slide covers goes to the closest slide and is marked "missing".

## 5. Decide the fix for each slide

A slide needs a fix when it has two or more questions, a follow-up question, or one confusion marker.

| Signal | Fix |
| --- | --- |
| The listener asks what something on the slide means: a label, a figure, a term | Rewrite the slide copy. Put the missing fact on the slide. |
| The listener asks why, how, or for proof, and the slide itself is clear | Rewrite the speaker notes. Put the best answer the presenter gave on the call into the notes, and start one line with `Emphasize:`. |
| The listener asks about a topic that no slide covers | Add it to the notes of the closest slide and list it in the report as a candidate new slide. Do not add a page without saying so. |

## 6. Write the report

Write `feedback/<YYYY-MM-DD>-<meeting-slug>.md` with one table: slide, questions, signal, fix. Quote each question word for word, with its timestamp.

## 7. Write the next version

- Copy `slides/<deck>-v<N>/` to `slides/<deck>-v<N+1>/`.
- Set `meta.title` to the new version and set `meta.createdAt` from `node -e "console.log(new Date().toISOString())"`.
- Apply only the fixes from the report. Keep the page order and keep `notes` aligned with the pages.
- Never invent a figure. A new number must come from the call, where the presenter said it, or from a cited public source. Otherwise put a `TODO:` line in the notes.
- Every page must still fit 1920 × 1080.

## 8. Show the change

- Run `git diff --no-index slides/<deck>-v<N> slides/<deck>-v<N+1>`.
- Reply with one table: slide, what changed, and the question that caused the change.
