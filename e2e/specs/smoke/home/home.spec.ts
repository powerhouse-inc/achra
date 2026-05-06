import { test } from '../../../fixtures'

test.describe('@smoke home', () => {
  test('should load the homepage with hero visible and no console errors', async ({
    homePage,
    consoleErrors,
  }) => {
    await homePage.goto()
    await homePage.navbar.expectDesktopLinksVisible()
    consoleErrors.assertNone()
  })
})
