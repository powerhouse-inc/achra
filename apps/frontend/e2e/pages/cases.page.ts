import { expect, type Locator } from '@playwright/test'
import { BasePage } from './base/base-page'

/**
 * `/cases` — use cases. Heading id is `use-cases-heading`.
 */
export class CasesPage extends BasePage {
  readonly path = '/cases'

  protected readyLocator(): Locator {
    return this.page.locator('#use-cases-heading')
  }

  async expectAtLeastOneCard(): Promise<void> {
    const cards = this.page.locator('main a, main article')
    await expect.poll(async () => cards.count(), { timeout: 10_000 }).toBeGreaterThan(0)
  }
}
