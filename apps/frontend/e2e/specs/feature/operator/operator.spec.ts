import { expect, test } from '../../../fixtures'
import { getEnv } from '../../../support/env'

test.describe('@feature operator', () => {
  test('should list at least one service link on the operator profile', async ({
    operatorPage,
  }) => {
    const { operatorSlug } = getEnv()
    await operatorPage.goto({ params: { operatorSlug } })
    await operatorPage.expectAtLeastOneService()
  })

  test('should render the not-found state for a non-existent operator slug', async ({ page }) => {
    await page.goto('/services/operators/__missing_operator__', { waitUntil: 'domcontentloaded' })
    await expect(page.getByText(/Page not found/i)).toBeVisible()
  })
})
