import { expect, test } from '../../fixtures'

const MOBILE_NAV_LINKS = [
  { label: 'Networks', urlPattern: /\/networks$/ },
  { label: 'Services', urlPattern: /\/services$/ },
  { label: 'Use Cases', urlPattern: /\/cases$/ },
] as const

test.describe('@flow @mobile mobile checkpoint', () => {
  test.use({ viewport: { width: 375, height: 812 } })

  test('should collapse the navbar to a mobile menu trigger', async ({ homePage }) => {
    await homePage.goto()
    await homePage.navbar.expectMobileMenuVisible()
  })

  for (const { label, urlPattern } of MOBILE_NAV_LINKS) {
    test(`should navigate to ${label} from the mobile menu`, async ({ homePage, page }) => {
      await homePage.goto()
      await homePage.navbar.clickMobileMenuLink(label)
      await expect(page).toHaveURL(urlPattern)
    })
  }
})
