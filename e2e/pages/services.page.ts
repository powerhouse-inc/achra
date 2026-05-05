import { expect, type Locator } from '@playwright/test'
import { BasePage } from './base/base-page'

/**
 * `/services` — services marketplace. Renders ServicesMarketplaceHeaderShell
 * with a search input and a grid of ServicesListSection cards (each card
 * links to `/services/{slug}` and exposes "More Info" / "Purchase" CTAs).
 */
export class ServicesPage extends BasePage {
  readonly path = '/services'

  protected readyLocator(): Locator {
    return this.searchInput()
  }

  private searchInput(): Locator {
    return this.page.getByRole('searchbox').first()
  }

  private cards(): Locator {
    return this.page.locator(
      'a[href^="/services/"]:not([href*="/operators/"]):not([href*="/purchase"])',
    )
  }

  async expectAtLeastOneCard(): Promise<void> {
    await expect.poll(async () => this.cards().count(), { timeout: 10_000 }).toBeGreaterThan(0)
  }

  async search(term: string): Promise<void> {
    // The visible filter input is controlled by useServicesFilters, which
    // wraps state in React useTransition + nuqs debounce. Driving it through
    // typing fights React's update prioritizer (transition updates can drop)
    // and makes the test brittle. The specs that call this assert the
    // URL→filter→cards chain, not input→URL, so navigate the URL directly —
    // after debounce the URL is what nuqs reads anyway.
    await this.page.goto(`${this.path}?search=${encodeURIComponent(term)}`, {
      waitUntil: 'domcontentloaded',
    })
  }

  async getCardsCount(): Promise<number> {
    return this.cards().count()
  }

  async openFirstCard(): Promise<{ slug: string }> {
    const first = this.cards().first()
    const href = await first.getAttribute('href')
    if (!href) throw new Error('First service card has no href')
    const match = /^\/services\/([^/?]+)/.exec(href)
    if (!match) throw new Error(`Unexpected service href: ${href}`)
    await first.click()
    return { slug: decodeURIComponent(match[1]) }
  }
}
