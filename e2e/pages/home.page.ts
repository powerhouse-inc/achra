import { expect, type Locator } from '@playwright/test'
import { BasePage } from './base/base-page'

/**
 * `/` — marketing homepage. Composed of HomeHero + several FadeInSection
 * blocks. The hero region carries `aria-labelledby="home-hero-heading"` so
 * we can use that landmark as the readiness signal.
 */
export class HomePage extends BasePage {
  readonly path = '/'

  protected readyLocator(): Locator {
    return this.page.locator('[aria-labelledby="home-hero-heading"]').first()
  }

  async expectMarketingSectionsVisible(): Promise<void> {
    // Each FadeInSection wraps a top-level section with a heading. We assert
    // the page has at least the FAQ section heading rendered, which sits near
    // the bottom of the page and confirms the full marketing fold rendered.
    await expect(
      this.page.getByRole('heading', { name: /FAQ|Frequently Asked/i }).first(),
    ).toBeVisible()
  }
}
