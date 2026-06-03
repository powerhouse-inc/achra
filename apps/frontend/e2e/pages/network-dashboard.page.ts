import { expect, type Locator } from '@playwright/test'
import { type NetworkDashboardSection, RELIABLE_DASHBOARD_SECTIONS } from '../data/constants'
import { BasePage } from './base/base-page'

/**
 * `/network/[slug]` — the network dashboard. Heading text is
 * `${networkName} Dashboard`; we match the trailing word "Dashboard" via
 * regex so we don't bind to a specific staging entity.
 *
 * Sections are anchored via `id="___SECTION___<name>"` (legacy convention
 * inherited from the original codebase). We avoid that brittle id and prefer
 * the section heading visible in viewport.
 */
export class NetworkDashboardPage extends BasePage {
  readonly path = '/network/:slug'

  protected readyLocator(): Locator {
    // The "{NetworkName} Dashboard" title is rendered as a styled <span>
    // (not an aria heading), so we match by text rather than role.
    return this.page.getByText(/Dashboard$/).first()
  }

  /**
   * Asserts the sections we know always render on a populated network are
   * attached to the DOM. Conditional sections (governance, proposals,
   * wallets, roadmap, details) are not asserted here — use
   * `expectSectionVisible(name)` directly for those.
   */
  async expectReliableSectionsRender(): Promise<void> {
    for (const section of RELIABLE_DASHBOARD_SECTIONS) {
      await expect(this.sectionAnchor(section)).toBeAttached()
    }
  }

  async scrollToSection(section: NetworkDashboardSection): Promise<void> {
    await this.sectionAnchor(section).scrollIntoViewIfNeeded()
  }

  async expectSectionVisible(section: NetworkDashboardSection): Promise<void> {
    await expect(this.sectionAnchor(section)).toBeVisible()
  }

  private sectionAnchor(section: NetworkDashboardSection): Locator {
    return this.page.locator(`#___SECTION___${section}`)
  }
}
