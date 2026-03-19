import fs from 'fs';
import path from 'path';

const CONFIDENCE_CAP = 20;
const SKIP_SENTINEL = -1;
const STATE_FILE = path.resolve(process.cwd(), 'e2e/confidence-index/.confidence-index.json');

export type State = Record<string, number>;

export function loadState(): State {
  try {
    const raw = fs.readFileSync(STATE_FILE, 'utf-8');
    const data = JSON.parse(raw) as Record<string, unknown>;
    const state: State = {};
    for (const [key, value] of Object.entries(data)) {
      const n = Number(value);
      if (Number.isInteger(n) && n >= SKIP_SENTINEL && n <= CONFIDENCE_CAP) state[key] = n;
    }
    return state;
  } catch {
    return {};
  }
}

export function saveState(state: State): void {
  const dir = path.dirname(STATE_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), 'utf-8');
}

/** Current streak (consecutive successful runs) for a test; 0 if unknown. */
export function getRacha(state: State, testId: string): number {
  return state[testId] ?? 0;
}

export function isDaily(state: State, testId: string): boolean {
  return getRacha(state, testId) >= CONFIDENCE_CAP;
}

export function buildTestId(relativePath: string, title: string): string {
  const normalized = relativePath.replace(/\\/g, '/');
  return `${normalized}::${title}`;
}

/**
 * Run mode: "always" = run only tests with streak < 20 (skip daily).
 * "daily" = run only tests with streak >= 20 (skip the rest).
 * Tests with SKIP_SENTINEL (-1) are excluded from all modes.
 */
export function shouldSkipByConfidence(
  state: State,
  testId: string,
  runMode: 'always' | 'daily'
): boolean {
  const racha = getRacha(state, testId);
  if (racha === SKIP_SENTINEL) return true;
  if (runMode === 'always') return racha >= CONFIDENCE_CAP;
  return racha < CONFIDENCE_CAP;
}

export function updateStateFromResults(
  current: State,
  results: Array<{ testId: string; status: string }>
): State {
  const byTest = new Map<string, { passed: boolean; skipped: boolean }>();
  for (const { testId, status } of results) {
    const passed = status === 'passed';
    const skipped = status === 'skipped';
    const existing = byTest.get(testId);
    if (existing === undefined) {
      byTest.set(testId, { passed, skipped });
    } else {
      if (!passed) existing.passed = false;
      if (!skipped) existing.skipped = false;
    }
  }
  const next = { ...current };
  for (const [testId, { passed, skipped }] of byTest) {
    if (passed) {
      const racha = Math.max(next[testId] ?? 0, 0);
      next[testId] = Math.min(racha + 1, CONFIDENCE_CAP);
    } else if (skipped) {
      next[testId] = SKIP_SENTINEL;
    } else {
      next[testId] = 0;
    }
  }
  return next;
}

export { CONFIDENCE_CAP, SKIP_SENTINEL, STATE_FILE };
