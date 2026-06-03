import { expect, type Locator, type Page } from '@playwright/test'
import { FooterComponent } from '../components/footer.component'
import { NavbarComponent } from '../components/navbar.component'

/**
 * Abstract page object. Subclasses MUST declare:
 *   - `path`: the route relative to baseURL (may use `:param` placeholders that
 *     callers replace via the `params` arg to `goto`).
 *   - `readyLocator()`: a stable element that signals the page has hydrated.
 *
 * Subclasses MUST NOT expose raw `Locator` instances to callers. Keep
 * locators private and surface intent methods + assertions.
 */
export abstract class BasePage {
  protected readonly page: Page
  private _navbar: NavbarComponent | null = null
  private _footer: FooterComponent | null = null

  constructor(page: Page) {
    this.page = page
  }

  abstract readonly path: string
  protected abstract readyLocator(): Locator

  get navbar(): NavbarComponent {
    // The navbar is a <header> that contains BOTH the desktop <nav> (links
    // visible at lg+) AND the mobile menu button (visible below lg, rendered
    // outside <nav> in the BrandArea). Scope to that header so component
    // methods see both children regardless of viewport.
    this._navbar ??= new NavbarComponent(
      this.page
        .locator('header')
        .filter({ has: this.page.locator('nav') })
        .first(),
    )
    return this._navbar
  }

  get footer(): FooterComponent {
    this._footer ??= new FooterComponent(this.page.locator('footer'))
    return this._footer
  }

  /**
   * Navigate to the page's `path`, substituting `:param` placeholders with
   * `params` and appending `query` as a search string.
   */
  async goto(
    options: { params?: Record<string, string>; query?: Record<string, string> } = {},
  ): Promise<this> {
    const { params = {}, query } = options
    let url = this.path
    for (const [key, value] of Object.entries(params)) {
      url = url.replace(`:${key}`, encodeURIComponent(value))
    }
    if (query) {
      const search = new URLSearchParams(query).toString()
      url = `${url}${url.includes('?') ? '&' : '?'}${search}`
    }
    // Use `domcontentloaded` rather than the default `load` because pages
    // with heavy Suspense boundaries (network dashboard, services list) keep
    // the load event pending past the default 30s navigation budget. We
    // assert real readiness via the page-defined readyLocator below.
    await this.page.goto(url, { waitUntil: 'domcontentloaded' })
    await this.waitForReady()
    return this
  }

  async waitForReady(): Promise<this> {
    await expect(this.readyLocator()).toBeVisible()
    return this
  }

  async expectUrl(pattern: string | RegExp): Promise<void> {
    await expect(this.page).toHaveURL(pattern)
  }
}
