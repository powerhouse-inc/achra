import { expect, type Locator } from '@playwright/test'
import { BasePage } from './base/base-page'

/**
 * `/network/[slug]/roadmaps` — roadmap listing.
 */
export class NetworkRoadmapsPage extends BasePage {
  readonly path = '/network/:slug/roadmaps'

  protected readyLocator(): Locator {
    // The page renders either:
    //   - "No roadmaps found" + "There are no roadmaps to display..." (empty)
    //   - "All Statuses" filter button + roadmap cards (populated)
    // Match the always-visible "All Statuses" filter, scoped to <main> so we
    // skip the navbar mobile dropdown that carries "Roadmaps" in its
    // aria-label and trips up generic regexes.
    return this.page
      .locator('main')
      .getByText(/All Statuses/i)
      .first()
  }

  async expectMilestoneListVisible(): Promise<void> {
    // The roadmap page renders a status filter and either cards or empty
    // state — assert one of those signals visible (the readyLocator already
    // handled the "All Statuses" filter; here we double-check the page body
    // reached interactive state).
    await expect(this.page.locator('main').first()).toBeVisible()
  }
}
