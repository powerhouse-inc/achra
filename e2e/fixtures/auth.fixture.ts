import type { Page } from '@playwright/test'

/**
 * Stub for future Renown-auth coverage. In v1, AUTH_ENABLED is off in
 * staging mode, so this fixture is a no-op that documents the future hook
 * point: when auth turns on, this is where we inject `storageState` from a
 * pre-warmed login session.
 */
export interface AuthFixture {
  loginAsTestUser(): Promise<void>
  logout(): Promise<void>
}

export function buildAuthFixture(_page: Page): AuthFixture {
  return {
    async loginAsTestUser(): Promise<void> {
      return Promise.resolve()
    },
    async logout(): Promise<void> {
      return Promise.resolve()
    },
  }
}
