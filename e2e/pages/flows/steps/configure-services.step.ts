import { expect, type Locator } from '@playwright/test'
import { PURCHASE_STEP } from '../../../data/constants'
import { PurchaseStepBase } from '../../base/purchase-step-base'

/**
 * Step 3 of the service-purchase flow. Renders billing-cycle toggles
 * (Quarterly / Annual), tier selection, option groups, and a Grand Total.
 * Advance via the shared NavigationButtons "Continue" button.
 */
export class ConfigureServicesStep extends PurchaseStepBase {
  readonly step = PURCHASE_STEP.configureServices

  protected readyLocator(): Locator {
    return this.page.getByRole('button', { name: /^Continue$/i }).first()
  }

  async clickContinue(): Promise<void> {
    const button = this.page.getByRole('button', { name: /^Continue$/i }).first()
    await expect(button).toBeEnabled({ timeout: 15_000 })
    await button.click()
  }
}
