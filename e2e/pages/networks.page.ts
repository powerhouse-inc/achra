import { expect, type Locator } from '@playwright/test'
import { BasePage } from './base/base-page'

/**
 * `/networks` — listing of all networks. NetworkGrid renders cards as
 * `<Link href="/network/{slug}">…</Link>`. The "Other Networks" h2 is below
 * the grid and confirms the Suspense boundary resolved.
 */
export class NetworksPage extends BasePage {
  readonly path = '/networks'

  protected readyLocator(): Locator {
    return this.page.getByRole('heading', { name: 'Other Networks', exact: true })
  }

  private cards(): Locator {
    return this.page.locator('a[href^="/network/"]')
  }

  async expectAtLeastOneCard(): Promise<void> {
    await expect.poll(async () => this.cards().count(), { timeout: 10_000 }).toBeGreaterThan(0)
  }

  async openFirstCard(): Promise<{ slug: string }> {
    const first = this.cards().first()
    const href = await first.getAttribute('href')
    if (!href) throw new Error('First network card is missing an href')
    const match = /^\/network\/([^/]+)/.exec(href)
    if (!match) throw new Error(`Unexpected network card href: ${href}`)
    await first.click()
    return { slug: decodeURIComponent(match[1]) }
  }
}
