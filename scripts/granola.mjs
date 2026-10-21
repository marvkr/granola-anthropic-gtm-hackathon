#!/usr/bin/env node
// Granola → transcripts/: fetch a note and its transcript, and the webhook that
// does it automatically when Granola finishes a note.
//
//   node scripts/granola.mjs note  <note_id>                         [--out transcripts/<file>.md]
//   node scripts/granola.mjs note  --file <note>.json [--simulated] [--out transcripts/<file>.md]
//   node scripts/granola.mjs serve [--port 8787] [--revise]
//
// `note` needs GRANOLA_API_KEY (Business or Enterprise plan) unless --file is given.
// `serve` also needs GRANOLA_WEBHOOK_SECRET, the `whsec_...` secret shown once when
// the webhook endpoint is created. With --revise, each new note runs
// update_deck.py, which writes the next deck version and its feedback report.

import { spawn } from "node:child_process";
import { createHmac, timingSafeEqual } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createServer } from "node:http";

const API = "https://public-api.granola.ai/v1";
const [command, ...rest] = process.argv.slice(2);
const positional = rest.filter((a, i) => !a.startsWith("--") && !rest[i - 1]?.startsWith("--"));

function flag(name) {
  const i = rest.indexOf(`--${name}`);
  return i === -1 ? null : rest[i + 1];
}

function fail(message) {
  console.error(`granola: ${message}`);
  process.exit(1);
}

// Loads KEY=value lines from .env without overriding the real environment.
function loadDotenv(path = ".env") {
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, "utf8").split("\n")) {
    const [key, ...value] = line.split("=");
    if (value.length && !line.trimStart().startsWith("#")) process.env[key.trim()] ??= value.join("=").trim();
  }
}

async function api(path) {
  const key = process.env.GRANOLA_API_KEY;
  if (!key) throw new Error("set GRANOLA_API_KEY in .env");
  return fetch(`${API}${path}`, { headers: { Authorization: `Bearer ${key}` } });
}

// Get Note with the transcript inlined, or fetched page by page when it is too large.
async function fetchNote(id) {
  const response = await api(`/notes/${id}?include=transcript`);
  if (response.ok) return response.json();
  if (response.status !== 413) throw new Error(`GET /notes/${id} returned ${response.status}: ${await response.text()}`);

  const note = await (await api(`/notes/${id}`)).json();
  note.transcript = [];
  let cursor = null;
  do {
    const page = await (await api(`/notes/${id}/transcript${cursor ? `?cursor=${cursor}` : ""}`)).json();
    note.transcript.push(...page.transcript);
    cursor = page.hasMore ? page.cursor : null;
  } while (cursor);
  return note;
}

const slug = (text) => text.toLowerCase().normalize("NFD").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60);

// The note-taker presents; everyone else is a listener, numbered in order of first turn.
function speakerNames(transcript) {
  const listeners = new Map();
  return (speaker) => {
    if (speaker.attribution === "me" || (!speaker.attribution && speaker.source === "microphone")) return "Presenter";
    const key = speaker.name ?? speaker.diarization_label ?? "listener";
    if (!listeners.has(key)) listeners.set(key, `Listener ${listeners.size + 1}`);
    return listeners.get(key);
  };
}

const elapsed = (from, to) => {
  const s = Math.max(0, Math.round((Date.parse(to) - Date.parse(from)) / 1000));
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
};

// The transcript file update_deck.py and the revise-deck-from-call skill read.
// Listeners are anonymized because the repository is public.
function toMarkdown(note, simulated) {
  const transcript = note.transcript ?? [];
  const date = (note.created_at ?? transcript[0]?.start_time ?? new Date().toISOString()).slice(0, 10);
  const nameOf = speakerNames(transcript);
  const lines = transcript.map(
    (t) => `**[${elapsed(transcript[0].start_time, t.start_time)}] ${nameOf(t.speaker)}:** ${t.text}`,
  );
  return [
    "---",
    `source: ${simulated ? "granola-simulated" : "granola"}`,
    `note_id: ${note.id}`,
    `title: ${JSON.stringify(note.title)}`,
    `date: ${date}`,
    "---",
    "",
    `# ${note.title}`,
    "",
    "## Summary",
    "",
    note.summary ?? "_No summary._",
    "",
    "## Transcript",
    "",
    lines.length ? lines.join("\n\n") : "_No transcript: the skill falls back to the summary._",
    "",
  ].join("\n");
}

async function saveNote(note, out, simulated = false) {
  const date = (note.created_at ?? new Date().toISOString()).slice(0, 10);
  const path = out ?? `transcripts/${date}-${slug(note.title)}.md`;
  await mkdir("transcripts", { recursive: true });
  await writeFile(path, toMarkdown(note, simulated));
  return path;
}

async function noteCommand() {
  const file = flag("file");
  if (!file && !positional[0]) fail("usage: note <note_id> | note --file <note>.json");
  try {
    const note = file ? JSON.parse(await readFile(file, "utf8")) : await fetchNote(positional[0]);
    console.log(await saveNote(note, flag("out"), rest.includes("--simulated")));
  } catch (error) {
    fail(error.message);
  }
}

// Standard Webhooks: HMAC-SHA256 of "{id}.{timestamp}.{body}", keyed with the base64 secret.
function verify(headers, body, secret) {
  const id = headers["webhook-id"], timestamp = headers["webhook-timestamp"], signatures = headers["webhook-signature"];
  if (!id || !timestamp || !signatures) return false;
  if (Math.abs(Date.now() / 1000 - Number(timestamp)) > 300) return false;
  const key = Buffer.from(secret.replace(/^whsec_/, ""), "base64");
  const expected = createHmac("sha256", key).update(`${id}.${timestamp}.${body}`).digest();
  return signatures.split(" ").some((s) => {
    const given = Buffer.from(s.replace(/^v1,/, ""), "base64");
    return given.length === expected.length && timingSafeEqual(given, expected);
  });
}

function revise(meetingPath) {
  const child = spawn("python3", ["update_deck.py", "--meeting", meetingPath], { stdio: "inherit" });
  child.on("exit", (code) => console.log(`update_deck.py finished for ${meetingPath} (exit ${code})`));
}

function serve() {
  const secret = process.env.GRANOLA_WEBHOOK_SECRET;
  if (!secret) fail("set GRANOLA_WEBHOOK_SECRET in .env");
  if (!process.env.GRANOLA_API_KEY) fail("set GRANOLA_API_KEY in .env");
  const seen = new Set();
  const port = Number(flag("port") ?? 8787);

  createServer((req, res) => {
    if (req.method !== "POST") return res.writeHead(405).end();
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", async () => {
      if (!verify(req.headers, body, secret)) return res.writeHead(401).end();
      // Answer first: Granola retries anything slower than 15 seconds.
      res.writeHead(200).end();
      const event = JSON.parse(body);
      if (seen.has(event.event_id) || !["note.generated", "note.access_granted"].includes(event.event_type)) return;
      seen.add(event.event_id);
      try {
        const path = await saveNote(await fetchNote(event.note_id));
        console.log(`${event.event_type} ${event.note_id} → ${path}`);
        if (rest.includes("--revise")) revise(path);
      } catch (error) {
        console.error(`granola: could not handle ${event.note_id}: ${error.message}`);
      }
    });
  }).listen(port, () => console.log(`Listening for Granola webhooks on http://localhost:${port}`));
}

loadDotenv();
const commands = { note: noteCommand, serve };
if (!commands[command]) fail("usage: note <note_id> | note --file <note>.json | serve [--revise]");
await commands[command]();
