import { PURCHASE_STEP } from '../../data/constants'
import { expect, test } from '../../fixtures'
import { getEnv } from '../../support/env'

test.describe('@feature service purchase', () => {
  test('should render all 5 step tabs in the wizard tablist', async ({ purchaseFlow, page }) => {
    const { serviceSlug } = getEnv()
    await purchaseFlow.goto({ params: { serviceSlug } })

    const tabs = page.getByRole('tab')
    await expect.poll(async () => tabs.count(), { timeout: 10_000 }).toBeGreaterThanOrEqual(5)
  })

  test('should preserve the step in the URL after refreshing on configure-services', async ({
    purchaseFlow,
    page,
  }) => {
    const { serviceSlug } = getEnv()
    await purchaseFlow.gotoStep(serviceSlug, PURCHASE_STEP.configureServices)
    await purchaseFlow.configureServices.expectActive()
    await page.reload()
    await purchaseFlow.expectStepInUrl(PURCHASE_STEP.configureServices)
  })

  test('should return to select-operator when going back from configure-services', async ({
    purchaseFlow,
  }) => {
    const { serviceSlug } = getEnv()
    await purchaseFlow.gotoStep(serviceSlug, PURCHASE_STEP.configureServices)
    await purchaseFlow.configureServices.expectActive()
    await purchaseFlow.clickBack()
    await purchaseFlow.selectOperator.expectActive()
  })

  test('should expose Name, Team Name, Email inputs and a submit button on the summary form', async ({
    purchaseFlow,
    page,
  }) => {
    const { serviceSlug } = getEnv()
    await purchaseFlow.gotoStep(serviceSlug, PURCHASE_STEP.summary)
    await purchaseFlow.summary.expectActive()
    await expect(page.locator('#submit-request-name')).toBeVisible()
    await expect(page.locator('#submit-request-team-name')).toBeVisible()
    await expect(page.locator('#submit-request-email')).toBeVisible()
    await expect(page.getByRole('button', { name: /Request a Quote/i })).toBeVisible()
  })
})
