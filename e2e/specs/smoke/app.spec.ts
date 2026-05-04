import { test } from '../../fixtures'

test.describe('@smoke app', () => {
  test('should load the homepage with hero visible and no console errors', async ({
    homePage,
    consoleErrors,
  }) => {
    await homePage.goto()
    await homePage.navbar.expectDesktopLinksVisible()
    consoleErrors.assertNone()
  })

  test('should retain the layout shell after a hard reload', async ({ homePage, page }) => {
    await homePage.goto()
    await page.reload()
    await homePage.waitForReady()
    // Footer should remount; if global chunks broke, footer would be missing.
    await homePage.footer.expectVisible()
  })
})
