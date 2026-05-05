import { expect, type Locator } from '@playwright/test'
import { BasePage } from './base/base-page'

/**
 * `/services/operators/[operatorSlug]` — operator profile.
 */
export class OperatorPage extends BasePage {
  readonly path = '/services/operators/:operatorSlug'

  protected readyLocator(): Locator {
    return this.page.getByRole('heading', { level: 1 }).first()
  }

  private serviceLinks(): Locator {
    return this.page.locator(
      'a[href^="/services/"]:not([href*="/operators/"]):not([href*="/purchase"])',
    )
  }

  async expectAtLeastOneService(): Promise<void> {
    await expect
      .poll(async () => this.serviceLinks().count(), { timeout: 10_000 })
      .toBeGreaterThan(0)
  }

  async openFirstService(): Promise<{ slug: string }> {
    const first = this.serviceLinks().first()
    const href = await first.getAttribute('href')
    if (!href) throw new Error('No href on first operator service link')
    const match = /^\/services\/([^/?]+)/.exec(href)
    if (!match) throw new Error(`Unexpected service href: ${href}`)
    await first.click()
    return { slug: decodeURIComponent(match[1]) }
  }
}
