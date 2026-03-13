/**
 * Script to compare run time: all tests at streak 20 (skip only) vs streak 0 (run all).
 * Usage: node e2e/confidence-index/benchmark.js
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const STATE_FILE = path.resolve(process.cwd(), 'e2e/confidence-index/.confidence-index.json');
const BACKUP_FILE = path.resolve(process.cwd(), 'e2e/confidence-index/.confidence-index.benchmark-backup.json');

// Backup current state
if (fs.existsSync(STATE_FILE)) {
  fs.copyFileSync(STATE_FILE, BACKUP_FILE);
  console.log('Backup saved to e2e/confidence-index/.confidence-index.benchmark-backup.json\n');
}

// Get test list (same format as reporter: e2e/path::title)
const listOutput = execSync(
  'npx playwright test --list --project=desktop-chrome',
  { cwd: process.cwd(), encoding: 'utf-8', maxBuffer: 10 * 1024 * 1024 }
);
const testIds = [];
for (const line of listOutput.split('\n')) {
  const match = line.match(/›\s+([^\s:]+\.spec\.ts):\d+:\d+\s+›\s+(.+)$/);
  if (match) {
    const [, filePath, title] = match;
    testIds.push(`e2e/${filePath}::${title.trim()}`);
  }
}
console.log(`Tests found: ${testIds.length}\n`);

function writeState(value) {
  const state = {};
  for (const id of testIds) state[id] = value;
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), 'utf-8');
}

function runTests() {
  const start = Date.now();
  try {
    execSync('npx playwright test --project=desktop-chrome', {
      cwd: process.cwd(),
      stdio: 'inherit',
      timeout: 600000,
    });
  } catch (e) {
    // exit code may be non-zero if tests fail
  }
  return (Date.now() - start) / 1000;
}

console.log('=== Run 1: all at streak 20 (skipped in normal run) ===');
writeState(20);
const timeAll20 = runTests();
console.log(`\nRun time (streak 20): ${Math.round(timeAll20)}s\n`);

console.log('=== Run 2: all at streak 0 (run all) ===');
writeState(0);
const timeAll0 = runTests();
console.log(`\nRun time (streak 0):  ${Math.round(timeAll0)}s\n`);

// Restore backup
if (fs.existsSync(BACKUP_FILE)) {
  fs.copyFileSync(BACKUP_FILE, STATE_FILE);
  fs.unlinkSync(BACKUP_FILE);
  console.log('State restored.\n');
}

console.log('--- Summary ---');
console.log(`Streak 20 (skip only): ${Math.round(timeAll20)}s`);
console.log(`Streak 0 (all):        ${Math.round(timeAll0)}s`);
if (timeAll0 > 0) {
  const saved = ((1 - timeAll20 / timeAll0) * 100).toFixed(1);
  console.log(`Time saved with streak 20: ${saved}%`);
}
