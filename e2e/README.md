# E2E Tests — Achra

End-to-end tests with [Playwright](https://playwright.dev/). They cover the main application flows against the staging environment.

## Table of Contents

- [Requirements](#requirements)
- [Setup](#setup)
- [Commands](#commands)
- [Structure](#structure)
- [Test Coverage](#test-coverage)
- [Confidence Index](#confidence-index)
- [Conventions](#conventions)

---

## Requirements

- Node.js >= 18
- pnpm
- Browsers installed: `pnpm exec playwright install`

## Setup

Copy `.env.example` to `.env` and fill in the variables:

```env
HOMEPAGE_REMOTE_URL=https://staging.achra.com
NEXT_PUBLIC_SWITCHBOARD_URL=https://switchboard-staging.powerhouse.xyz/graphql
NEXT_PUBLIC_ETH_MAINNET_RPC=https://ethereum-rpc.publicnode.com
NEXT_PUBLIC_SHOW_WHITELIST_OVERLAY=false
```

---

## Commands

| Command | Description |
|---------|-------------|
| `pnpm test:e2e` | Runs active tests only (filtered by Confidence Index) |
| `pnpm test:e2e:all` | Runs all tests without filtering, on desktop-chrome |
| `RUN_MODE=daily pnpm test:e2e` | Runs high-streak tests (daily run) |

### Playwright options

```bash
# Run with browser visible
pnpm test:e2e -- --headed

# Debug mode (opens Playwright Inspector)
pnpm test:e2e -- --debug

# Specific file
npx playwright test e2e/homepage.spec.ts --project=desktop-chrome

# Specific test by name
npx playwright test -g "should navigate to networks"

# View HTML report from last run
npx playwright show-report
```

### Available browsers

Defined in `playwright.config.ts`:

| Project | Browser | Viewport |
|---------|---------|----------|
| `chromium` | Chrome | Default |
| `firefox` | Firefox | Default |
| `webkit` | Safari | Default |
| `desktop-chrome` | Chrome | 1440×900 |

`test:e2e:all` uses `desktop-chrome` by default.

---

## Structure

```
e2e/
├── confidence-index/          # Confidence Index system (see section below)
├── footer/
│   ├── dspot-side.spec.ts
│   └── powerhouse-side.spec.ts
├── networks/
│   ├── networks.spec.ts
│   ├── roadmaps.spec.ts
│   ├── builders/
│   │   ├── builders.spec.ts
│   │   ├── builder.profile.spec.ts
│   │   └── budget_statements/
│   │       ├── account.snapshot.spec.ts
│   │       └── expense.reports.spec.ts
│   ├── details/
│   │   ├── network.details.spec.ts
│   │   ├── network.builders.spec.ts
│   │   ├── network.finances.spec.ts
│   │   ├── network.governance.spec.ts
│   │   ├── network.proposals.spec.ts
│   │   ├── network.roadmap.spec.ts
│   │   └── network.wallets.spec.ts
│   └── finances/
│       └── finances.budget.spec.ts
├── services/
│   ├── services.spec.ts
│   ├── operator.spec.ts
│   ├── resource.spec.ts
│   └── purchase/
│       ├── navigation.spec.ts
│       ├── info.spec.ts
│       ├── operator.spec.ts
│       ├── services.spec.ts
│       ├── summary.spec.ts
│       └── confirmation.spec.ts
├── workstreams/
│   ├── workstreams.spec.ts
│   ├── workstream.details.spec.ts
│   └── project.details.spec.ts
└── homepage.spec.ts
```

---

## Test Coverage

### Homepage
- Navigation to main sections (Networks, Services, Use Cases)
- External links (Vetra, Powerhouse, Academy)
- Subscription form

### Networks
- Network listing and navigation to detail
- **Details:** banner, finances, governance, proposals, wallets, builders, roadmap
- **Builders:** search, skill filtering, sorting, profile links
- **Budget Statements:** account snapshots, expense reports
- **Finances:** budget reports
- **Roadmaps:** visualization

### Services
- Service listing and resource detail
- **Operators:** info, available services, links
- **Purchase flow (5 steps):**
  1. Product Info
  2. Select Operator
  3. Configure Services
  4. Summary (form + validations)
  5. Confirmation

### Workstreams
> Most of these tests are skipped (out of current MVP scope).

- Status and network filtering
- Title search
- Pagination
- Navigation to detail, RFP, and proposals

### Footer
- Product links (Achra, Vetra)
- Company links (About us, Academy)
- External links

---

## Confidence Index

A system that reduces execution time by running only the tests that need attention.

### How it works

Each test has a **streak**: the number of consecutive successful runs (max 20).

- Test **passes** → `streak = min(streak + 1, 20)`
- Test **fails** → `streak = 0`

**Execution rules:**

| Mode | Tests that run |
|------|---------------|
| Normal (`pnpm test:e2e`) | Tests with streak < 20 |
| Daily (`RUN_MODE=daily`) | Tests with streak >= 20 |

State is persisted in `e2e/confidence-index/.confidence-index.json`.

### System files

| File | Role |
|------|------|
| `run.js` | Filters tests by streak before invoking Playwright |
| `confidence-reporter.ts` | Custom reporter that updates state after each test |
| `state.ts` | State logic and rules |
| `helper.ts` | Optional helper to skip tests by streak inside a spec |
| `.confidence-index.json` | Persisted state (do not edit manually) |

For more details, see [`confidence-index/README.md`](./confidence-index/README.md).

---

## Conventions

### Spec structure

```typescript
import { test, expect } from '@playwright/test';

const BASE_URL = process.env.HOMEPAGE_REMOTE_URL;

test.describe('Feature name', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/route`);
    await page.waitForLoadState('networkidle');
  });

  test('should [verb] [expected result]', async ({ page }) => {
    // arrange, act, assert
  });
});
```

### Test naming

Use the pattern `should [verb] [action/result]`:

```
should navigate back to product info from select operator step
should show validation errors when submitting empty required fields
should load the operator and service info
```

### Selectors (in order of preference)

1. `getByRole()` — accessible and robust
2. `getByText()` — for visible text
3. `getByPlaceholder()` — for inputs
4. `locator()` with CSS — fallback only; add a `// TODO: refactor locator` comment

### Dynamic test data

To avoid collisions between runs, generate unique data with a timestamp:

```typescript
const ts = Date.now();
await page.getByRole('textbox', { name: 'Email' }).fill(`test+${ts}@test.com`);
```

### Popups / new tabs

```typescript
const newTabPromise = page.waitForEvent('popup');
await page.getByRole('link', { name: 'External Link' }).click();
const newTab = await newTabPromise;
await newTab.waitForLoadState();
await expect(newTab).toHaveURL('https://expected-url.com');
```

### Tests out of MVP scope

Use `test.skip()` with an explanatory comment:

```typescript
test.skip('should filter by status', async ({ page }) => {
  // Out of MVP scope
});
```
