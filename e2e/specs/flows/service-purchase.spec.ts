import { PURCHASE_STEP } from '../../data/constants'
import { expect, test } from '../../fixtures'
import { getEnv } from '../../support/env'

test.describe('@flow service purchase', () => {
  test('should complete the happy path from step 1 to confirmation with valid form submission', async ({
    purchaseFlow,
  }) => {
    const { serviceSlug } = getEnv()
    await purchaseFlow.goto({ params: { serviceSlug } })

    const ts = Date.now()
    await purchaseFlow.completeHappyPath({
      name: `E2E Tester ${ts}`,
      teamName: `E2E Team ${ts}`,
      email: `e2e+${ts}@test.invalid`,
    })
  })

  test('should show validation errors on the summary step when required fields are empty', async ({
    purchaseFlow,
  }) => {
    const { serviceSlug } = getEnv()
    await purchaseFlow.gotoStep(serviceSlug, PURCHASE_STEP.summary)
    await purchaseFlow.summary.expectActive()
    await purchaseFlow.summary.submit()
    await purchaseFlow.summary.expectValidationErrors()
    await purchaseFlow.expectStepInUrl(PURCHASE_STEP.summary)
  })

  test('should return to configure-services from the summary back button', async ({
    purchaseFlow,
  }) => {
    const { serviceSlug } = getEnv()
    await purchaseFlow.gotoStep(serviceSlug, PURCHASE_STEP.summary)
    await purchaseFlow.summary.expectActive()
    await purchaseFlow.clickBack()
    await purchaseFlow.configureServices.expectActive()
    await purchaseFlow.expectStepInUrl(PURCHASE_STEP.configureServices)
  })

  test('should render the configure-services step when deep-linked', async ({ purchaseFlow }) => {
    const { serviceSlug } = getEnv()
    await purchaseFlow.gotoStep(serviceSlug, PURCHASE_STEP.configureServices)
    await purchaseFlow.configureServices.expectActive()
  })

  test('should render the not-found state for an unknown service slug', async ({ page }) => {
    // Next.js dev serves not-found.tsx with status 200; assert the page
    // content rather than status code.
    await page.goto('/services/__missing__/purchase', { waitUntil: 'domcontentloaded' })
    await expect(page.getByText(/Page not found/i)).toBeVisible()
  })
})
