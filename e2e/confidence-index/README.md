# Confidence Index

Two-tier system to reduce which tests run on each execution:

- **Run always**: tests with streak < 20 (or new). Run on every normal execution.
- **Daily list**: tests with streak ≥ 20. Skipped in normal runs; run only in the daily run.

## Rules

- **Streak**: number of consecutive successful runs per test (max 20).
- **If test passes**: streak = min(streak + 1, 20).
- **If test fails**: streak = 0 (moves back to "run always").
- **New test** (not in state): streak 0 → runs always.

## Usage

### Fast strategy (recommended): filter before loading

The **`run.js`** script filters which tests to run **before** Playwright loads specs, so only the chosen tests are loaded and executed (much faster when most are "daily").

```bash
# Normal run: only tests with streak < 20
pnpm run test:e2e
# or
node e2e/confidence-index/run.js

# Daily run: only tests with streak >= 20
RUN_MODE=daily pnpm run test:e2e
# or
RUN_MODE=daily node e2e/confidence-index/run.js
```

You can pass arguments to Playwright: `pnpm run test:e2e -- --headed`

`run.js` runs Playwright **per file** with `--grep` only for the selected tests (one invocation per file); this avoids any hook in specs and prevents state/skip mismatches. Titles are sorted by length descending to reduce substring matches when two titles are similar.

### Run all (no confidence filtering)

```bash
pnpm run test:e2e:all
# or
npx playwright test --project=desktop-chrome
```

With empty state or all at streak 0, every test runs. To skip confidence for a single run, use `test:e2e:all`.

### Benchmark (optional)

To measure how much time the confidence index saves, run **`benchmark.js`**: it runs the suite once with all tests at streak 20 (skip only) and once with all at streak 0 (run all), then prints a summary and restores the previous state.

```bash
node e2e/confidence-index/benchmark.js
```

## Files

- **`e2e/confidence-index/.confidence-index.json`**: state (testId → streak). Created/updated at the end of each run by the reporter.
- **`run.js`**: script that filters tests by state and runs Playwright per file with `--grep` (single source of truth; specs have no confidence hooks).
- **`state.ts`**: read/write state and rules (cap 20, updateFromResults).
- **`confidence-reporter.ts`**: reporter that accumulates results in `onTestEnd` and updates state in `onEnd`.
- **`helper.ts`**: used only if you run Playwright directly with skip-by-hook (optional; not used when using `run.js`).
- **`benchmark.js`**: optional script to compare run time with streak 20 vs streak 0; see "Benchmark" above.

## Test ID

Each test is identified by `{path relative to cwd}::{title}` (e.g. `e2e/homepage.spec.ts::has a link to the Networks page`). It must be stable (same string across runs).

## New specs

Nothing needs to be added in specs; `run.js` gets the test list via `playwright test --list` and filters by state. Just ensure the test has a stable title (same string across runs) so the testId matches the state.