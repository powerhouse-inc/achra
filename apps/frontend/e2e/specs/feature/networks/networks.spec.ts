import { expect, test } from '../../../fixtures'

test.describe('@feature networks listing', () => {
  test('should give every card a non-empty visible name and a /network/ href', async ({
    networksPage,
    page,
  }) => {
    await networksPage.goto()
    await networksPage.expectAtLeastOneCard()
    const cards = page.locator('a[href^="/network/"]')
    const count = await cards.count()
    for (let i = 0; i < count; i += 1) {
      const href = await cards.nth(i).getAttribute('href')
      expect(href).toMatch(/^\/network\/[a-z0-9-]+/i)
      const text = (await cards.nth(i).textContent())?.trim() ?? ''
      expect(text.length).toBeGreaterThan(0)
    }
  })

  test('should render the "Other Networks" heading below the grid', async ({
    networksPage,
    page,
  }) => {
    await networksPage.goto()
    await expect(page.getByRole('heading', { name: 'Other Networks', exact: true })).toBeVisible()
  })
})
