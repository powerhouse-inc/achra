import { expect, test } from '../../../fixtures'
import { getEnv } from '../../../support/env'

test.describe('@feature builders', () => {
  test('should show at least one row in the builders list', async ({ buildersListPage }) => {
    const { networkSlug } = getEnv()
    await buildersListPage.goto({ params: { slug: networkSlug } })
    await buildersListPage.expectAtLeastOneBuilder()
  })

  test('should render the builder profile with a main heading', async ({
    builderProfilePage,
    page,
  }) => {
    const env = getEnv()
    await builderProfilePage.goto({
      params: { slug: env.networkSlug, builderSlug: env.builderSlug },
    })
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible()
  })

  test('should load the builder profile budget-statements subpage', async ({ page }) => {
    const env = getEnv()
    const response = await page.goto(
      `/network/${env.networkSlug}/builders/${env.builderSlug}/budget-statements`,
      { waitUntil: 'domcontentloaded' },
    )
    expect(response?.status()).toBeLessThan(500)
  })

  test('should render the not-found state for a non-existent builder slug', async ({ page }) => {
    const { networkSlug } = getEnv()
    await page.goto(`/network/${networkSlug}/builders/__missing_builder__`, {
      waitUntil: 'domcontentloaded',
    })
    await expect(page.getByText(/Page not found/i)).toBeVisible()
  })
})
