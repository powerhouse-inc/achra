import { expect, test } from '../../fixtures'

test.describe('@feature home', () => {
  test('should render the FAQ section heading near the bottom of the marketing fold', async ({
    homePage,
  }) => {
    await homePage.goto()
    await homePage.expectMarketingSectionsVisible()
  })

  test('should link the hero CTAs to internal routes without broken hrefs', async ({
    homePage,
    page,
  }) => {
    await homePage.goto()
    const links = page.locator('main a[href]')
    const count = await links.count()
    for (let i = 0; i < count; i += 1) {
      const href = await links.nth(i).getAttribute('href')
      expect(href, `link #${i} has no href`).not.toBe('')
      expect(href, `link #${i} href is null`).not.toBeNull()
    }
  })
})
