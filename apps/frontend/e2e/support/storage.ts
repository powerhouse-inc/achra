import type { Page } from '@playwright/test'

/**
 * Init-script that runs in every new document before any framework code,
 * clearing localStorage keys that could leak state across tests.
 *
 * Targets:
 *  - service-purchase-* (Zustand persistence for the purchase flow)
 *  - WHITELIST_OVERLAY_STORAGE_KEY (whitelist overlay submission state)
 */
const PERSIST_PREFIXES = ['service-purchase-', 'WHITELIST_OVERLAY']

export async function installStorageReset(page: Page): Promise<void> {
  await page.addInitScript((prefixes: readonly string[]) => {
    try {
      for (let i = window.localStorage.length - 1; i >= 0; i -= 1) {
        const key = window.localStorage.key(i)
        if (!key) continue
        if (prefixes.some((prefix) => key.startsWith(prefix))) {
          window.localStorage.removeItem(key)
        }
      }
    } catch {
      // SecurityError on first navigation in some contexts — safe to ignore.
    }
  }, PERSIST_PREFIXES)
}
