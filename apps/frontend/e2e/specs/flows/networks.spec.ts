import { test } from '../../fixtures'

test('@flow should render reliable dashboard sections after clicking a network card from the listing', async ({
  networksPage,
  networkDashboardPage,
}) => {
  await networksPage.goto()
  await networksPage.openFirstCard()
  await networkDashboardPage.waitForReady()
  await networkDashboardPage.expectReliableSectionsRender()
})
