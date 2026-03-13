#!/usr/bin/env node
/**
 * Runs only "always" tests (streak < 20) or "daily" tests (streak >= 20)
 * based on RUN_MODE. Filters before loading specs for faster runs.
 * Usage: node e2e/confidence-index/run.js [playwright args]
 *        RUN_MODE=daily node e2e/confidence-index/run.js
 */
const { execSync, spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const CONFIDENCE_CAP = 20;
const STATE_FILE = path.resolve(process.cwd(), 'e2e/confidence-index/.confidence-index.json');
const RUN_MODE = (process.env.RUN_MODE || 'always').toLowerCase();

function loadState() {
  try {
    const raw = fs.readFileSync(STATE_FILE, 'utf-8');
    const data = JSON.parse(raw);
    const state = {};
    for (const [key, value] of Object.entries(data)) {
      const n = Number(value);
      if (Number.isInteger(n) && n >= 0 && n <= CONFIDENCE_CAP) state[key] = n;
    }
    return state;
  } catch {
    return {};
  }
}

function listTestIds(project) {
  const out = execSync(
    `npx playwright test --list --project=${project}`,
    { encoding: 'utf-8', maxBuffer: 10 * 1024 * 1024, cwd: process.cwd() }
  );
  const ids = [];
  for (const line of out.split('\n')) {
    const m = line.match(/›\s+([^\s:]+\.spec\.ts):\d+:\d+\s+›\s+(.+)$/);
    if (m) ids.push(`e2e/${m[1]}::${m[2].trim()}`);
  }
  return ids;
}

function escapeRegex(s) {
  return s.replace(/[\\^$.*+?()[\]{}|]/g, '\\$&');
}

function filterTests(state, allIds, runMode) {
  const wantDaily = runMode === 'daily';
  return allIds.filter((id) => {
    const racha = state[id] ?? 0;
    const isDaily = racha >= CONFIDENCE_CAP;
    return wantDaily ? isDaily : !isDaily;
  });
}

function main() {
  const state = loadState();
  const project = process.env.PLAYWRIGHT_PROJECT || 'desktop-chrome';
  const allIds = listTestIds(project);
  const selected = filterTests(state, allIds, RUN_MODE);

  const passThrough = process.argv.slice(2).filter((a) => a !== '--' && !a.startsWith('--project='));
  const projectArg = passThrough.some((a) => a.startsWith('--project='))
    ? []
    : ['--project=' + project];

  if (selected.length === 0) {
    console.log(`Confidence: 0 tests to run (RUN_MODE=${RUN_MODE}).`);
    process.exit(0);
  }

  const byFile = new Map();
  for (const id of selected) {
    const [file, title] = id.split('::');
    if (!byFile.has(file)) byFile.set(file, []);
    byFile.get(file).push(title);
  }

  console.log(`Confidence: running ${selected.length} tests (RUN_MODE=${RUN_MODE}).`);
  let exitCode = 0;
  for (const [file, titles] of byFile) {
    // No ^ $ in pattern to avoid issues when passing from Node to Playwright
    const sorted = [...titles].sort((a, b) => b.length - a.length);
    const grepPattern = '(' + sorted.map(escapeRegex).join('|') + ')';
    const args = [
      'playwright',
      'test',
      file,
      ...projectArg,
      '--grep',
      grepPattern,
      ...passThrough,
    ].filter(Boolean);
    const result = spawnSync('npx', args, {
      cwd: process.cwd(),
      stdio: 'inherit',
      shell: false,
    });
    if (result.status !== 0) exitCode = result.status;
  }
  process.exit(exitCode);
}

main();
