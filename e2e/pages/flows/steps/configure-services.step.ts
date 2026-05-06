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
    // Scope to the configure-services tabpanel so the assertion fails until
    // the URL→store sync has flipped activeStep. The shared NavigationButtons
    // (and its "Continue" button) render on every non-product-info step, so a
    // generic Continue locator passes while the store still thinks we're on
    // the default step — which makes the next clickBack() a no-op.
    return this.page
      .getByRole('tabpanel', { name: /Configure Services/i })
      .getByRole('group', { name: /Billing period/i })
  }

  async clickContinue(): Promise<void> {
    const button = this.page.getByRole('button', { name: /^Continue$/i }).first()
    await expect(button).toBeEnabled({ timeout: 15_000 })
    await button.click()
  }
}
