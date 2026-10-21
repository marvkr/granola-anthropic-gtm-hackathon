#!/usr/bin/env node
// Deck versions: one folder per version (slides/<deck>-v<N>), one registry per
// deck (versions/<deck>.json), and one git tag per released version (<deck>-v<N>).
//
//   node scripts/deck-version.mjs next  <deck> [--meeting "<title>"] [--meeting-date YYYY-MM-DD] [--report feedback/<file>.md]
//   node scripts/deck-version.mjs tag   <deck>
//   node scripts/deck-version.mjs check
//   node scripts/deck-version.mjs list  <deck>

import { execFileSync } from "node:child_process";
import { randomBytes } from "node:crypto";
import { cp, readFile, readdir, writeFile } from "node:fs/promises";

const [command, deck, ...rest] = process.argv.slice(2);

function flag(name) {
  const i = rest.indexOf(`--${name}`);
  return i === -1 ? null : rest[i + 1];
}

function git(...args) {
  return execFileSync("git", args, { encoding: "utf8" }).trim();
}

function fail(message) {
  console.error(`deck-version: ${message}`);
  process.exit(1);
}

const registryPath = (name) => `versions/${name}.json`;
const folderOf = (name, n) => `slides/${name}-v${n}`;
const tagOf = (name, n) => `${name}-v${n}`;

async function readJson(path) {
  return JSON.parse(await readFile(path, "utf8"));
}

async function writeJson(path, value) {
  await writeFile(path, `${JSON.stringify(value, null, 2)}\n`);
}

function tagExists(tag) {
  return git("tag", "--list", tag) === tag;
}

async function next() {
  const registry = await readJson(registryPath(deck));
  const latest = registry.versions.at(-1);
  const n = latest.version + 1;
  const folder = folderOf(deck, n);
  await cp(latest.folder, folder, { recursive: true, errorOnExist: true, force: false });

  const createdAt = new Date().toISOString();
  await stampVersion(`${folder}/index.tsx`, n, createdAt);

  const meetingTitle = flag("meeting");
  registry.versions.push({
    version: n,
    folder,
    createdAt,
    basedOn: latest.version,
    meeting: meetingTitle ? { title: meetingTitle, date: flag("meeting-date") } : null,
    report: flag("report"),
  });
  await writeJson(registryPath(deck), registry);
  await groupInHomePage(registry.name, `${deck}-v${n}`);
  console.log(folder);
}

// Sets the copied deck's meta.title and meta.createdAt to the new version.
async function stampVersion(entry, n, createdAt) {
  const source = await readFile(entry, "utf8");
  await writeFile(
    entry,
    source
      .replace(/title: "(.*?) V\d+"/, `title: "$1 V${n}"`)
      .replace(/createdAt: "[^"]*"/, `createdAt: "${createdAt}"`),
  );
}

// Puts every version of a deck in one folder on the Open Slide home page.
async function groupInHomePage(name, slideId) {
  const path = "slides/.folders.json";
  const manifest = await readJson(path);
  let folder = manifest.folders.find((f) => f.name === name);
  if (!folder) {
    folder = { id: `f-${randomBytes(4).toString("hex")}`, name, icon: { type: "color", value: "#c4643f" } };
    manifest.folders.push(folder);
  }
  manifest.assignments[slideId] = folder.id;
  await writeJson(path, manifest);
}

async function tag() {
  if (git("status", "--porcelain")) fail("commit or discard local changes before tagging");
  const registry = await readJson(registryPath(deck));
  for (const { version, meeting } of registry.versions) {
    const name = tagOf(deck, version);
    if (tagExists(name)) continue;
    const message = meeting ? `${registry.name} V${version}, from ${meeting.title}` : `${registry.name} V${version}`;
    git("tag", "-a", name, "-m", message);
    git("push", "origin", name);
    console.log(`tagged ${name}`);
  }
}

// A tagged version is frozen: its folder must match the tag exactly.
async function check() {
  const registries = (await readdir("versions")).filter((f) => f.endsWith(".json"));
  const problems = (await Promise.all(registries.map(checkRegistry))).flat();
  if (problems.length) fail(`\n  ${problems.join("\n  ")}`);
  console.log("deck versions ok");
}

async function checkRegistry(file) {
  const problems = [];
  const registry = await readJson(`versions/${file}`);
  const name = registry.deck;
  const folders = (await readdir("slides")).filter((f) => new RegExp(`^${name}-v\\d+$`).test(f));
  registry.versions.forEach(({ version, folder }, i) => {
    if (version !== i + 1) problems.push(`${file}: version ${version} is out of sequence`);
    if (folder !== folderOf(name, version)) problems.push(`${file}: version ${version} points to ${folder}`);
    if (!folders.includes(`${name}-v${version}`)) problems.push(`${folder} is missing`);
    const tag = tagOf(name, version);
    if (tagExists(tag) && git("diff", "--name-only", tag, "--", folder)) {
      problems.push(`${folder} changed after it was tagged ${tag}; write a new version instead`);
    }
  });
  for (const f of folders) {
    if (!registry.versions.some((v) => v.folder === `slides/${f}`)) problems.push(`slides/${f} is not in ${file}`);
  }
  return problems;
}

async function list() {
  const registry = await readJson(registryPath(deck));
  for (const v of registry.versions) {
    const tagged = tagExists(tagOf(deck, v.version)) ? "tagged" : "draft";
    console.log(`V${v.version}  ${tagged}  ${v.createdAt.slice(0, 10)}  ${v.meeting?.title ?? "-"}`);
  }
}

const commands = { next, tag, check, list };
if (!commands[command] || (command !== "check" && !deck)) fail("usage: next|tag|list <deck>, or check");
await commands[command]();
