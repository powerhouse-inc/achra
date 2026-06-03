import { expect, type Locator, type Page } from '@playwright/test'
import { PURCHASE_STEP, type PurchaseStepValue } from '../../data/constants'
import { BasePage } from '../base/base-page'
import { ConfigureServicesStep } from './steps/configure-services.step'
import { ConfirmationStep } from './steps/confirmation.step'
import { ProductInfoStep } from './steps/product-info.step'
import { SelectOperatorStep } from './steps/select-operator.step'
import { SummaryStep } from './steps/summary.step'

/**
 * Orchestrator for the 5-step service-purchase flow living at
 * `/services/[serviceSlug]/purchase`. Step state is URL-driven via
 * `?step=...` and synced to a Zustand store by `<StepUrlSync>`. Deep-links
 * are supported.
 *
 * Each step is a sub-object exposed as a getter on this class. The
 * orchestrator owns cross-step transitions (Back/Continue, deep-link, happy
 * path) so individual step POMs stay focused.
 */
export class ServicePurchaseFlow extends BasePage {
  readonly path = '/services/:serviceSlug/purchase'

  readonly productInfo: ProductInfoStep
  readonly selectOperator: SelectOperatorStep
  readonly configureServices: ConfigureServicesStep
  readonly summary: SummaryStep
  readonly confirmation: ConfirmationStep

  constructor(page: Page) {
    super(page)
    this.productInfo = new ProductInfoStep(page)
    this.selectOperator = new SelectOperatorStep(page)
    this.configureServices = new ConfigureServicesStep(page)
    this.summary = new SummaryStep(page)
    this.confirmation = new ConfirmationStep(page)
  }

  protected readyLocator(): Locator {
    // The Tabs root + service heading is the most stable signal that the
    // wizard mounted (works for any starting step).
    return this.page.getByRole('tablist').first()
  }

  /**
   * Deep-link to a specific step on the purchase page for `serviceSlug`.
   */
  async gotoStep(serviceSlug: string, step: PurchaseStepValue): Promise<this> {
    await this.goto({ params: { serviceSlug }, query: { step } })
    return this
  }

  /**
   * Click the shared "Back" button (rendered by NavigationButtons on every
   * step except product-info).
   */
  async clickBack(): Promise<void> {
    await this.page
      .getByRole('button', { name: /^Back$/i })
      .first()
      .click()
  }

  /**
   * Walks steps 1 → 5 with the provided contact info, asserting each
   * transition. Used by the happy-path flow spec.
   */
  async completeHappyPath(input: { name: string; teamName: string; email: string }): Promise<void> {
    await this.productInfo.expectActive()
    await this.productInfo.clickSelectOperator()

    await this.selectOperator.expectActive()
    await this.selectOperator.clickConfigureServices()

    await this.configureServices.expectActive()
    await this.configureServices.clickContinue()

    await this.summary.expectActive()
    await this.summary.fillForm(input)
    await this.summary.submit()

    await this.confirmation.expectActive()
  }

  /** Convenience: which step is currently active per URL. */
  currentStep(): PurchaseStepValue | null {
    const url = new URL(this.page.url())
    const step = url.searchParams.get('step')
    if (!step) return null
    const values = Object.values(PURCHASE_STEP) as readonly string[]
    return values.includes(step) ? (step as PurchaseStepValue) : null
  }

  async expectStepInUrl(step: PurchaseStepValue): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(`step=${step}\\b`))
  }
}
