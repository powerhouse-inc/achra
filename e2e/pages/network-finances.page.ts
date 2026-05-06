import { expect, type Locator } from '@playwright/test'
import { BasePage } from './base/base-page'

/**
 * `/network/[slug]/finances` — finances drill-down. We assert the route
 * loads and a finances landmark renders, but deliberately DO NOT assert
 * specific dollar amounts or chart tooltip values (data drift + flake).
 */
export class NetworkFinancesPage extends BasePage {
  readonly path = '/network/:slug/finances'

  protected readyLocator(): Locator {
    return this.page.getByRole('heading', { name: /finances/i }).first()
  }

  async expectLoadedWithoutCrash(): Promise<void> {
    await expect(this.readyLocator()).toBeVisible()
  }
}
