import { expect, type Locator } from '@playwright/test'
import { BasePage } from './base/base-page'

/**
 * `/network/[slug]/builders` — list of builders for a network. The page
 * renders a search box, a skills filter, sort controls, and a row of
 * builder cards. We assume role-based access via `getByRole('searchbox')`
 * and `getByRole('combobox')` — if those roles aren't present in the
 * source, the spec failure will surface that and we add data-testids.
 */
export class BuildersListPage extends BasePage {
  readonly path = '/network/:slug/builders'

  protected readyLocator(): Locator {
    // The builders page renders a search input and a table; there is no h1
    // labelled "Builders" — the search box is a stable readiness signal.
    return this.page.getByRole('searchbox').first()
  }

  private rows(): Locator {
    return this.page.locator('a[href*="/builders/"]')
  }

  async expectAtLeastOneBuilder(): Promise<void> {
    await expect.poll(async () => this.rows().count(), { timeout: 10_000 }).toBeGreaterThan(0)
  }

  async getFirstBuilderName(): Promise<string> {
    const first = this.rows().first()
    return (await first.textContent())?.trim() ?? ''
  }

  async openFirstBuilder(): Promise<{ slug: string }> {
    const first = this.rows().first()
    const href = await first.getAttribute('href')
    if (!href) throw new Error('First builder row has no href')
    const match = /\/builders\/([^/]+)/.exec(href)
    if (!match) throw new Error(`Unexpected builder href: ${href}`)
    await first.click()
    return { slug: decodeURIComponent(match[1]) }
  }
}
