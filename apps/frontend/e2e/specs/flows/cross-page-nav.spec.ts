import { expect, test } from '../../fixtures'

test('@flow should sweep from home to a builder profile via in-app navigation', async ({
  homePage,
  networksPage,
  networkDashboardPage,
  buildersListPage,
  builderProfilePage,
  page,
}) => {
  await homePage.goto()
  await homePage.navbar.navigateToNetworks()
  await networksPage.waitForReady()

  const { slug: networkSlug } = await networksPage.openFirstCard()
  await networkDashboardPage.waitForReady()
  await expect(page).toHaveURL(new RegExp(`/network/${networkSlug}\\b`))

  await buildersListPage.goto({ params: { slug: networkSlug } })
  await buildersListPage.expectAtLeastOneBuilder()

  const { slug: builderSlug } = await buildersListPage.openFirstBuilder()
  await builderProfilePage.waitForReady()
  await expect(page).toHaveURL(new RegExp(`/builders/${builderSlug}\\b`))
})
