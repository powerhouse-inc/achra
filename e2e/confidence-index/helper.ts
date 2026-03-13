import path from 'path';
import type { TestInfo } from '@playwright/test';
import {
  loadState,
  buildTestId,
  shouldSkipByConfidence,
} from './state';

const RUN_MODE = (process.env.RUN_MODE as 'always' | 'daily') || 'always';

let cachedState: ReturnType<typeof loadState> | null = null;

function getState() {
  if (cachedState === null) cachedState = loadState();
  return cachedState;
}

/**
 * Build the same test id used by the reporter (relative path from cwd + title).
 */
function getTestIdFromTestInfo(testInfo: TestInfo): string {
  const relativePath = path.relative(process.cwd(), testInfo.file);
  return buildTestId(relativePath, testInfo.title);
}

/**
 * Call this in test.beforeEach to skip tests that are "daily" in normal runs,
 * or "always" in daily runs. Use with RUN_MODE env:
 * - RUN_MODE=always (default): skip tests with streak >= 20
 * - RUN_MODE=daily: skip tests with streak < 20
 */
export function shouldSkipConfidence(testInfo: TestInfo): boolean {
  const state = getState();
  const testId = getTestIdFromTestInfo(testInfo);
  return shouldSkipByConfidence(state, testId, RUN_MODE);
}
