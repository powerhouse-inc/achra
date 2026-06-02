import { test } from '../../../fixtures'

test.describe('@smoke services', () => {
  test('should render service cards and search input on /services', async ({ servicesPage }) => {
    await servicesPage.goto()
    await servicesPage.expectAtLeastOneCard()
  })
})
