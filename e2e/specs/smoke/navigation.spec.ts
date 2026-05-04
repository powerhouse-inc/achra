import { expect, test } from '../../fixtures'

test.describe('@smoke navigation', () => {
  test('should land on /networks when clicking the Networks navbar link', async ({
    homePage,
    page,
  }) => {
    await homePage.goto()
    await homePage.navbar.navigateToNetworks()
    await expect(page).toHaveURL(/\/networks$/)
  })

  test('should land on /services when clicking the Services navbar link', async ({
    homePage,
    page,
  }) => {
    await homePage.goto()
    await homePage.navbar.navigateToServices()
    await expect(page).toHaveURL(/\/services$/)
  })

  test('should land on /cases when clicking the Use Cases navbar link', async ({
    homePage,
    page,
  }) => {
    await homePage.goto()
    await homePage.navbar.navigateToUseCases()
    await expect(page).toHaveURL(/\/cases$/)
  })

  test('should point at the public hub URL from the Operational Hub link', async ({ homePage }) => {
    await homePage.goto()
    const href = await homePage.navbar.getOperationalHubHref()
    expect(href).toMatch(/operationalhub\.io/i)
  })

  test('should render at least one network card on /networks', async ({ networksPage }) => {
    await networksPage.goto()
    await networksPage.expectAtLeastOneCard()
  })

  test('should render service cards and search input on /services', async ({ servicesPage }) => {
    await servicesPage.goto()
    await servicesPage.expectAtLeastOneCard()
  })

  test('should render case cards on /cases', async ({ casesPage }) => {
    await casesPage.goto()
    await casesPage.expectAtLeastOneCard()
  })
})
