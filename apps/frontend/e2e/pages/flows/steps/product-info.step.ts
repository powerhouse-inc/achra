import { PURCHASE_STEP } from '../../../data/constants'
import { PurchaseStepBase } from '../../base/purchase-step-base'
import type { Locator } from '@playwright/test'

/**
 * Step 1 of the service-purchase flow. Presents resource description and a
 * primary CTA to advance to operator selection.
 */
export class ProductInfoStep extends PurchaseStepBase {
  readonly step = PURCHASE_STEP.productInfo

  protected readyLocator(): Locator {
    return this.page.getByRole('button', { name: /^Select an operator$/i })
  }

  async clickSelectOperator(): Promise<void> {
    await this.page.getByRole('button', { name: /^Select an operator$/i }).click()
  }
}
