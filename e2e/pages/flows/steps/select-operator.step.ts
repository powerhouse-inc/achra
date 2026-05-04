import { PURCHASE_STEP } from '../../../data/constants'
import { PurchaseStepBase } from '../../base/purchase-step-base'
import type { Locator } from '@playwright/test'

/**
 * Step 2 of the service-purchase flow. Renders an OperatorCard whose primary
 * CTA "Configure Services" advances to the next step.
 */
export class SelectOperatorStep extends PurchaseStepBase {
  readonly step = PURCHASE_STEP.selectOperator

  protected readyLocator(): Locator {
    return this.page.getByRole('button', { name: /^Configure Services$/i }).first()
  }

  async clickConfigureServices(): Promise<void> {
    await this.page
      .getByRole('button', { name: /^Configure Services$/i })
      .first()
      .click()
  }
}
