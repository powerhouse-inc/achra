import path from 'node:path'
import { defineConfig, devices } from '@playwright/test'
import dotenv from 'dotenv'

// Load e2e env from `e2e/.env.e2e` (preferred) or `e2e/env.e2e`. The non-dot
// variant exists because some sandboxed write contexts cannot create
// dot-prefixed files in subdirectories — both paths are read; values from the
// dot file win when both are present.
dotenv.config({ path: path.resolve(process.cwd(), 'e2e/env.e2e') })
dotenv.config({
  path: path.resolve(process.cwd(), 'e2e/.env.e2e'),
  override: true,
})

const PORT = Number(process.env.E2E_PORT ?? 3000)
const BASE_URL = process.env.E2E_BASE_URL ?? `http://localhost:${PORT}`

// Cap local parallelism: a single Next.js dev server bottlenecks under
// many concurrent workers, surfacing as flaky timeouts on data-heavy
// pages. CI uses a fresh server boot, so 2 workers there is safe.
// Override via E2E_WORKERS — accepts a number (`4`) or percentage (`50%`).
const workersEnv = process.env.E2E_WORKERS
const WORKERS: number | string = workersEnv
  ? workersEnv.endsWith('%')
    ? workersEnv
    : Number(workersEnv)
  : process.env.CI
    ? 2
    : 3

export default defineConfig({
  testDir: './e2e/specs',
  outputDir: './test-results',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: WORKERS,
  timeout: 60_000,
  expect: { timeout: 10_000 },
  reporter: process.env.CI
    ? [['html', { open: 'never' }], ['github'], ['list']]
    : [['html', { open: 'never' }], ['list']],
  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1440, height: 900 },
      },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
      grep: /@mobile/,
    },
  ],
  webServer: {
    command: 'pnpm dev',
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
    stdout: 'ignore',
    stderr: 'pipe',
    env: {
      NEXT_PUBLIC_ENVIRONMENT: process.env.NEXT_PUBLIC_ENVIRONMENT ?? 'staging',
      NEXT_PUBLIC_SWITCHBOARD_URL: process.env.NEXT_PUBLIC_SWITCHBOARD_URL ?? '',
      NEXT_PUBLIC_ETH_MAINNET_RPC: process.env.NEXT_PUBLIC_ETH_MAINNET_RPC ?? '',
      NEXT_PUBLIC_SHOW_WHITELIST_OVERLAY: process.env.NEXT_PUBLIC_SHOW_WHITELIST_OVERLAY ?? 'false',
      NEXT_PUBLIC_LEAVE_PAGE_GUARD_ENABLED:
        process.env.NEXT_PUBLIC_LEAVE_PAGE_GUARD_ENABLED ?? 'false',
      NEXT_PUBLIC_ENABLE_SERVICE_PURCHASE_STORE_PERSISTENCE:
        process.env.NEXT_PUBLIC_ENABLE_SERVICE_PURCHASE_STORE_PERSISTENCE ?? 'false',
    },
  },
})
