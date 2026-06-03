import { expect, type Locator } from '@playwright/test'
import { PURCHASE_STEP } from '../../../data/constants'
import { PurchaseStepBase } from '../../base/purchase-step-base'

/**
 * Step 4 of the service-purchase flow. Renders a summary card and the
 * submit-request form (Name, Team Name, Email + "Request a Quote" submit).
 * Form schema is in modules/service-purchase/lib/submit-request-schema.
 */
export class SummaryStep extends PurchaseStepBase {
  readonly step = PURCHASE_STEP.summary

  protected readyLocator(): Locator {
    return this.page.getByRole('button', { name: /^Request a Quote/i })
  }

  private nameInput(): Locator {
    return this.page.locator('#submit-request-name')
  }

  private teamNameInput(): Locator {
    return this.page.locator('#submit-request-team-name')
  }

  private emailInput(): Locator {
    return this.page.locator('#submit-request-email')
  }

  private submitButton(): Locator {
    return this.page.getByRole('button', { name: /^Request a Quote/i })
  }

  async fillForm(input: { name: string; teamName: string; email: string }): Promise<void> {
    await this.nameInput().fill(input.name)
    await this.teamNameInput().fill(input.teamName)
    await this.emailInput().fill(input.email)
  }

  async submit(): Promise<void> {
    await this.submitButton().click()
  }

  async expectValidationErrors(): Promise<void> {
    await expect(this.page.getByText(/team name must be at least/i)).toBeVisible()
    await expect(this.page.getByText(/please enter a valid email/i)).toBeVisible()
  }
}
