import { expect, type Locator } from '@playwright/test'
import { BasePage } from './base/base-page'

/**
 * Triggered by visiting any unrecognized path. Wraps `app/not-found.tsx`.
 */
export class NotFoundPage extends BasePage {
  readonly path = '/__not_found_route_for_e2e__'

  protected readyLocator(): Locator {
    return this.page.getByText(/not found|404/i).first()
  }

  async expectHomeLinkVisible(): Promise<void> {
    await expect(this.page.getByRole('link', { name: /home|return/i }).first()).toBeVisible()
  }
}
