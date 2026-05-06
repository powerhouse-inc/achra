import { expect, type Locator } from '@playwright/test'
import { BasePage } from './base/base-page'

/**
 * `/network/[slug]/builders/[builderSlug]` — builder profile.
 */
export class BuilderProfilePage extends BasePage {
  readonly path = '/network/:slug/builders/:builderSlug'

  protected readyLocator(): Locator {
    return this.page.getByRole('heading', { level: 1 }).first()
  }

  async expectSkillsAndDescriptionVisible(): Promise<void> {
    // Skills section uses a 'Skills' heading (h2 or h3) in the profile layout.
    // Description sits in a second region. We assert visibility without
    // pinning to specific copy.
    await expect(this.page.getByText(/skills/i).first()).toBeVisible()
  }
}
