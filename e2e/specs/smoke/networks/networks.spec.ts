import { test } from '../../../fixtures'

test.describe('@smoke networks', () => {
  test('should render at least one network card on /networks', async ({ networksPage }) => {
    await networksPage.goto()
    await networksPage.expectAtLeastOneCard()
  })
})
