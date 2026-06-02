import { expect, type Locator } from '@playwright/test'
import { PURCHASE_STEP } from '../../../data/constants'
import { PurchaseStepBase } from '../../base/purchase-step-base'

/**
 * Step 5 of the service-purchase flow. Final state after a successful
 * SubmitRequestForm submission.
 */
export class ConfirmationStep extends PurchaseStepBase {
  readonly step = PURCHASE_STEP.confirmation

  protected readyLocator(): Locator {
    return this.page.getByText(/thank you|received|submitted|confirmation/i).first()
  }

  async expectSuccessState(): Promise<void> {
    await expect(this.readyLocator()).toBeVisible()
  }
}
