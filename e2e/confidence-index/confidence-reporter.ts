import path from 'path';
import type { Reporter, TestCase, TestResult } from '@playwright/test/reporter';
import {
  loadState,
  saveState,
  buildTestId,
  updateStateFromResults,
} from './state';

function getTestId(test: TestCase): string {
  const file = test.location.file;
  const relativePath = path.relative(process.cwd(), file).replace(/\\/g, '/');
  return buildTestId(relativePath, test.title);
}

class ConfidenceReporter implements Reporter {
  private results: Array<{ testId: string; status: string }> = [];

  onTestEnd(test: TestCase, result: TestResult) {
    if (result.status === 'skipped') return;
    this.results.push({ testId: getTestId(test), status: result.status });
  }

  async onEnd() {
    if (this.results.length === 0) return;
    const state = loadState();
    const next = updateStateFromResults(state, this.results);
    saveState(next);
  }

  printsToStdio(): boolean {
    return false;
  }
}

export default ConfidenceReporter;
