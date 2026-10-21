---
# Sample Granola export of a VC call where slides/anthropic-v1 was presented.
# Fictional people and firm, made up for the demo. The presenter's figures
# come from the deck and its speaker notes.
source: granola
meeting_type: investor_pitch
title: "Anthropic V1 deck review with Harbor Peak Capital"
date: 2026-10-20
duration_minutes: 32
deck: anthropic
deck_version_presented: 1
attendees:
  - name: Maya Lindqvist
    role: Presenter
    side: presenter
  - name: Jordan Reyes
    role: General Partner, Harbor Peak Capital
    side: listener
  - name: Priya Natarajan
    role: Principal, Harbor Peak Capital
    side: listener
---

# Anthropic V1 deck review with Harbor Peak Capital

## Summary

Maya walked Jordan and Priya through the 11-slide V1 deck. They were sold on
the revenue growth and the developer-led adoption story. Most questions landed
on four slides: the problem slide (what "control" means), the market slide
(what the 40% is a share of, and the Menlo source), competition (why safety is
a moat and not a feature others can copy), and the raise (how the $65B maps to
the compute commitments). They also asked about gross margins and open-weight
models, which no slide covers.

## Action items

- [ ] **Maya:** Send V2 of the deck before the partner meeting on Monday
- [ ] **Maya:** Add a clear answer on margins / compute cost, or say why it isn't public
- [ ] **Priya:** Share Harbor Peak's enterprise AI buyer survey

## Transcript

**[00:00] Maya Lindqvist:** Thanks both for making time. I'll share my screen. This is a demo deck we built about Anthropic. Every number is from a public source, and the sources are in the speaker notes.

**[00:14] Jordan Reyes:** Great, go for it.

**[00:20] Maya Lindqvist:** Anthropic builds Claude. Slide two, the problem. AI can do the work now: it writes code, does research and takes actions. But enterprises still have to trust it. They need safety, reliability and control.

**[01:02] Priya Natarajan:** Sorry, what do you mean by "control" here? Control over the model, over the data, over who in the company can use it?

**[01:10] Maya Lindqvist:** Mostly the last two. Admins decide who gets access, what data Claude can see, and they get audit logs. It's governance more than steering the model.

**[01:24] Priya Natarajan:** Okay. Then I'd say that. "Control" on its own reads like you're claiming you can control the model's behaviour.

**[01:31] Jordan Reyes:** And "reliability" next to "safety", how is that different? Is reliability uptime, or the model giving the same answer twice?

**[01:40] Maya Lindqvist:** Fair, it's more the second. Predictable behaviour in production.

**[01:47] Jordan Reyes:** Got it. Keep going.

**[01:52] Maya Lindqvist:** Slide three, why now. Enterprise generative AI spend went from 11.5 billion in 2024 to 37 billion in 2025. That's the 3.2x. Four billion of it was AI coding alone, and 73% of developers who use AI coding tools use them every day.

**[02:20] Jordan Reyes:** Clear. That's the Menlo report?

**[02:23] Maya Lindqvist:** Yes, Menlo Ventures, December 2025, and Stack Overflow for the daily-use number.

**[02:31] Maya Lindqvist:** Slide four, product. One model family, Opus, Sonnet and Haiku 5.5, behind every surface: the Claude apps, Claude Code, the API, and AWS and Google Cloud. The output is production work: code, analysis and agents.

**[03:05] Jordan Reyes:** Makes sense.

**[03:10] Maya Lindqvist:** Slide five, traction. Run-rate revenue crossed 47 billion dollars in May 2026. More than 500 customers spend over a million a year. Eight of the Fortune 10 are customers. Claude Code alone passed 2.5 billion in run-rate in February.

**[03:38] Jordan Reyes:** 47 billion in May. Do you have anything more recent? That's five months ago at this point.

**[03:44] Maya Lindqvist:** Press reports put it above 65 billion by the end of July. That's AI Magazine, August 2026. Anthropic's own published figure is the 47.

**[03:55] Jordan Reyes:** I'd put the 65 on the slide with the source, honestly. It's the most impressive number you have and it's in your notes, not on the page.

**[04:04] Priya Natarajan:** And the Claude Code number is from February too. So the slide mixes May and February. Can you line those up, or at least make the dates obvious?

**[04:14] Maya Lindqvist:** The dates are in the labels, but they're small. Point taken.

**[04:20] Jordan Reyes:** What do margins look like on that revenue? With the compute bill you show later, I assume gross margin is the question every partner asks.

**[04:29] Maya Lindqvist:** Anthropic doesn't publish gross margin, so it's not in the deck.

**[04:34] Jordan Reyes:** Then say that somewhere. If it's not addressed, it's the first question on Monday.

**[04:42] Maya Lindqvist:** Slide six, market. Adoption starts with a developer using Claude Code, spreads to the team, and becomes an enterprise deployment. At the bottom: 40% enterprise LLM API share, against OpenAI at 27 and Google at 21, and 54% for coding.

**[05:10] Priya Natarajan:** Wait, 40% of what exactly? Share of spend, share of companies, share of tokens?

**[05:16] Maya Lindqvist:** Share of enterprise LLM API spend.

**[05:19] Priya Natarajan:** So not total AI spend, just the API. That's a big difference. The slide just says "share".

**[05:26] Jordan Reyes:** And that's Menlo again? Isn't Menlo an Anthropic investor?

**[05:30] Maya Lindqvist:** Yes, Menlo is an investor. It's in the speaker notes.

**[05:34] Jordan Reyes:** It needs to be on the slide. Any partner will spot that and it'll look like you hid it.

**[05:41] Priya Natarajan:** Also, the market slide doesn't have a market size on it. I see the expansion path, which I like, but how big is the prize?

**[05:49] Maya Lindqvist:** The 37 billion on slide three is the market today.

**[05:53] Priya Natarajan:** Then reference it here. Right now the "market" slide is really a go-to-market slide.

**[06:02] Maya Lindqvist:** Slide seven, business model. Three ways to buy: usage-based API, seat subscriptions on Pro, Max and Team, and annual enterprise contracts, including through cloud marketplaces.

**[06:25] Jordan Reyes:** What's the split between those three? Is the API most of the revenue?

**[06:30] Maya Lindqvist:** There's no public breakdown by channel.

**[06:33] Jordan Reyes:** Okay. Even directional would help, but fine.

**[06:38] Maya Lindqvist:** Slide eight, competition. The edge is that safety research ships as product. Constitutional AI and the Responsible Scaling Policy make behaviour predictable. Claude Code is the agent 66% of agent users pick. And the cloud partnerships let customers buy through the cloud they already use.

**[07:05] Jordan Reyes:** Why is safety a moat, though? Why can't OpenAI or Google publish their own policy next quarter and close the gap?

**[07:13] Maya Lindqvist:** They can publish a policy. What's hard to copy is that the safety research is what makes the model predictable in production. Enterprises buy the behaviour, not the PDF. And Anthropic has been doing this since 2021, so it shows up in the product, in things like how Claude handles ambiguous instructions.

**[07:36] Jordan Reyes:** That answer is better than the slide. "Enterprises buy the behaviour, not the policy." Put that in.

**[07:42] Priya Natarajan:** How do you prove "predictable behaviour" to a buyer? Is there a benchmark or a customer story?

**[07:48] Maya Lindqvist:** The strongest proof is adoption: 8 of the Fortune 10 and the coding share. Those buyers ran their own evaluations.

**[07:57] Priya Natarajan:** Okay, then connect those dots for me. The table says "predictable behaviour" but the proof is two slides back.

**[08:05] Jordan Reyes:** And what about open-weight models? Llama, DeepSeek, Mistral. Enterprises can self-host those for free. Where do they fit?

**[08:12] Maya Lindqvist:** Most enterprises still pay for frontier quality and support, but we don't cover that in the deck.

**[08:18] Jordan Reyes:** You should. It's the bear case everyone raises.

**[08:24] Maya Lindqvist:** Slide nine, team. Dario Amodei, co-founder and CEO. Daniela Amodei, co-founder and President. Founded in 2021 by former OpenAI researchers. 965 billion valuation as of May.

**[08:45] Jordan Reyes:** Clear.

**[08:50] Maya Lindqvist:** Slide ten, the raise. 65 billion dollar Series H at 965 billion post-money, led by Altimeter, Dragoneer, Greenoaks and Sequoia. And the compute behind it: 5 GW of TPU capacity with Google and Broadcom, up to 5 GW with Amazon, and 30 billion of Azure compute with up to 1 GW of NVIDIA systems.

**[09:20] Priya Natarajan:** Sorry, I don't follow how these connect. Is the 65 billion paying for those compute deals? The 30 billion Azure number is a dollar figure and the other two are gigawatts.

**[09:31] Maya Lindqvist:** The raise funds the compute build-out. The partnerships are the capacity it secures. They're reported in different units because that's how each partner announced them.

**[09:42] Priya Natarajan:** Then the slide needs to say that. Right now it looks like three random numbers under a headline about the raise.

**[09:49] Jordan Reyes:** And what does the compute buy you? More training runs, more inference capacity for customers? Tie it back to revenue.

**[09:56] Maya Lindqvist:** Both. Capacity is what lets revenue keep compounding without rationing access.

**[10:02] Jordan Reyes:** Good. That sentence goes on the slide.

**[10:08] Maya Lindqvist:** Last slide: AI research and products that put safety at the frontier, and the one command to try Claude Code.

**[10:20] Jordan Reyes:** Nice close. Overall, the story works. The growth is obviously the headline. Fix the market slide, make the raise slide make sense, and have an answer on margins and open-weight models, and I'm happy to take it to partners Monday.

**[10:36] Priya Natarajan:** Agreed. Send the new version by Friday?

**[10:39] Maya Lindqvist:** Will do. Thanks both.
