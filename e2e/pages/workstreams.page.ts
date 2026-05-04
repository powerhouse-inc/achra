import { BasePage } from './base/base-page'
import type { Locator } from '@playwright/test'

/**
 * `/workstreams` — out of MVP for v1. POM is provided so the fixture system
 * resolves; specs deliberately omit it. Re-enable when WORKSTREAMS_ENABLED
 * is on for staging.
 */
export class WorkstreamsPage extends BasePage {
  readonly path = '/workstreams'

  protected readyLocator(): Locator {
    return this.page.locator('main')
  }
}
