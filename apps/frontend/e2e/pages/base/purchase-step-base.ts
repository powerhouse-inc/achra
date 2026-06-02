import { expect, type Locator, type Page } from '@playwright/test'
import type { PurchaseStepValue } from '../../data/constants'

/**
 * Base for the five sub-objects of the service-purchase flow. Each step is a
 * stateful view of the same `/services/:serviceSlug/purchase` page,
 * distinguished only by the `?step=` query param. Steps do NOT navigate
 * independently — the `ServicePurchaseFlow` orchestrator owns transitions and
 * exposes deep-link helpers when needed.
 */
export abstract class PurchaseStepBase {
  protected readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  abstract readonly step: PurchaseStepValue
  protected abstract readyLocator(): Locator

  async waitForReady(): Promise<this> {
    await expect(this.page).toHaveURL(new RegExp(`step=${this.step}\\b`))
    await expect(this.readyLocator()).toBeVisible()
    return this
  }

  async expectActive(): Promise<this> {
    await this.waitForReady()
    return this
  }
}
