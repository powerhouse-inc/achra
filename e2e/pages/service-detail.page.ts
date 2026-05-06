import { expect, type Locator } from '@playwright/test'
import { BasePage } from './base/base-page'

/**
 * `/services/[serviceSlug]` — service profile. Exposes "Request a Quote"
 * (PurchaseButton) and "Book a call" CTAs from
 * modules/service-profile/components/service-profile.
 */
export class ServiceDetailPage extends BasePage {
  readonly path = '/services/:serviceSlug'

  protected readyLocator(): Locator {
    return this.page.getByRole('heading', { level: 1 }).first()
  }

  private purchaseCta(): Locator {
    return this.page
      .getByRole('button', { name: /Request a Quote/i })
      .or(this.page.getByRole('link', { name: /Request a Quote/i }))
      .first()
  }

  async expectPurchaseCtaVisible(): Promise<void> {
    await expect(this.purchaseCta()).toBeVisible()
  }

  async clickPurchaseCta(): Promise<void> {
    await this.purchaseCta().click()
  }
}
