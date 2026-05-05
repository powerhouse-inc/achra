import { expect, test } from '../../../fixtures'

test.describe('@feature not-found', () => {
  test('should render the not-found shell on an unknown route', async ({ page }) => {
    await page.goto('/__definitely_not_a_real_route__', { waitUntil: 'domcontentloaded' })
    await expect(page.getByText(/Page not found/i).first()).toBeVisible()
  })

  test('should return to the homepage via the navbar brand link', async ({
    notFoundPage,
    homePage,
    page,
  }) => {
    await notFoundPage.goto()
    await notFoundPage.navbar.clickBrandHomeLink()
    await expect(page).toHaveURL(/\/$/)
    await homePage.waitForReady()
  })
})
