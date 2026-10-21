---
source: granola-simulated
note_id: not_SIMULATEDanthropicV3
title: "Simulated customer call: Anthropic V3 deck"
date: 2026-10-20
---

# Simulated customer call: Anthropic V3 deck

## Summary

SIMULATED CALL. Nobody held this meeting. The presenter pitched the Anthropic V3 demo deck to the platform and security leads of a fictional company choosing a model vendor for internal agents. The trust framing, the product surfaces, the growth headline and the closing install command landed. The listeners did not follow the three ways to buy: they read them as alternatives, asked whether they would pay twice with seats plus Bedrock, and what counting toward an AWS commitment means. They asked for data use and retention, which no slide covers, and said the raise slide speaks to investors, not to buyers asking about capacity and rate limits. Next steps: data use docs and a pricing example with seats plus Bedrock; pilot call next week.

## Transcript

**[00:00] Presenter:** Thanks for the time. I'll take you through Anthropic in eleven slides, then we can talk about a pilot. It's a demo deck, every number is from a public source.

**[00:15] Listener 1:** Great. We're a platform team choosing a model vendor for internal agents, so that's the lens.

**[00:24] Presenter:** Slide two. AI can do the work. Enterprises still have to trust it. Admins control access and data, get audit logs, and the model behaves predictably in production.

**[00:38] Listener 2:** That's the right framing for us. Security is my job, so governance is what I care about.

**[00:47] Presenter:** Slide three. Enterprise AI spend tripled in a year, 11.5 to 37 billion, whole market figures from Menlo Ventures.

**[00:57] Listener 1:** Okay, clear.

**[01:04] Presenter:** Slide four. One model family behind every surface: Claude apps, Claude Code, the API, AWS and Google Cloud.

**[01:14] Listener 1:** We're on AWS, so that's Bedrock for us. Good.

**[01:21] Presenter:** Slide five. Run-rate revenue went from 47 to 65 billion plus in about two months.

**[01:30] Listener 1:** That's a striking number. The headline makes it easy to remember.

**[01:37] Presenter:** Slide six. A developer wedge opens the 37 billion enterprise market. Developer, then team, then an enterprise deployment with SSO, SCIM, audit logs and admin controls.

**[01:50] Listener 2:** Good, that's concrete now.

**[01:57] Presenter:** Slide seven. Usage starts with developers. Contracts expand the account. Three ways to buy: usage-based API, seat subscriptions, and annual enterprise contracts, including through cloud marketplaces.

**[02:10] Listener 1:** Sorry, I don't follow. Are those three options and we pick one, or do they stack?

**[02:19] Presenter:** They stack. Seats are for people using the Claude apps and Claude Code. The API is metered for what you build into your own systems. An enterprise contract can bundle both with committed spend.

**[02:35] Listener 1:** So if we have seats and we also build agents on Bedrock, do we pay Anthropic twice?

**[02:44] Presenter:** You pay for both, but on Bedrock the API usage is billed through AWS and can count toward your AWS commitment. The seats are separate.

**[02:57] Listener 1:** What do you mean, count toward the commitment? Our finance team will ask exactly that.

**[03:06] Presenter:** If you have a committed spend agreement with AWS, marketplace purchases can draw it down. I'd check the exact terms with your AWS rep.

**[03:18] Listener 1:** Okay. That really needs to be on the slide. Right now it reads like three alternatives.

**[03:27] Presenter:** Fair. Slide eight. Our edge is safety research that ships as product. Enterprises buy the behaviour, not the policy. 8 of the Fortune 10 run Claude.

**[03:40] Listener 2:** How does that show up for an agent that touches our production systems?

**[03:48] Presenter:** It shows up as an agent that follows your system prompt and tool permissions more reliably, and that asks before an ambiguous action instead of guessing.

**[04:01] Listener 2:** That's useful. And do you train on our data? Where does it live? Legal will block us on that before anything else.

**[04:12] Presenter:** Commercial and API data isn't used for training by default, and on Bedrock the data stays in your AWS account and region. I don't have a slide on that.

**[04:26] Listener 2:** Wait, there's no slide on data use at all? For a security buyer that's the first question. I'd add one.

**[04:37] Presenter:** Understood. Slide nine, the team. Dario Amodei, CEO, and Daniela Amodei, President, founded in 2021.

**[04:46] Listener 1:** Fine.

**[04:53] Presenter:** Slide ten. The 65 billion Series H funds the compute that keeps revenue compounding. 5 gigawatts of TPU with Google and Broadcom, up to 5 with Amazon.

**[05:06] Listener 1:** For us the question is simpler. Will we hit rate limits when we scale our agents? What does the compute mean for capacity we can actually get?

**[05:19] Presenter:** The commitments are there so capacity grows with demand. For your account, enterprise contracts come with higher rate limits, and on Bedrock you can buy provisioned throughput.

**[05:32] Listener 1:** That answer is better than the slide. The slide talks to investors, not to a buyer.

**[05:41] Presenter:** Last slide. AI research and products that put safety at the frontier, and the one command to install Claude Code.

**[05:52] Listener 1:** Ending on the install command is nice. Our developers will just try it.

**[06:00] Listener 2:** Next step for us: the data use and retention docs, and a pricing example with seats plus Bedrock.

**[06:10] Presenter:** I'll send both today and set up a pilot call with your platform team next week.
