# Deck style guide

Placeholder: replace with your own style. The deck updater sends this file to
Claude on every run, so anything written here shapes the new version.

## Voice
- Confident, plain English. No buzzwords ("revolutionary", "synergy", "AI-powered platform").
- Short headlines: 6 words or fewer.
- Lead with numbers. Every claim should have a number or a named customer behind it.

## Slide structure
- One idea per slide.
- At most 3–4 bullets per slide, each under 12 words.
- Bold the single most important number on each slide.
- Use tables for comparisons, never 2×2 quadrant charts.

## Speaker notes
- Every slide has speaker notes in a `<!-- Speaker notes: ... -->` comment.
- Notes say what to *say*, not what's on the slide.
- When a slide changes because of investor feedback, the notes say which feedback it answers.

## Format rules
- Slides are separated by a line with `---`.
- Keep the frontmatter at the top and bump `version` on each update.
- Don't invent data. If a slide needs a number we don't have, use a placeholder like `[TODO: weekly active seats by cohort]`.
