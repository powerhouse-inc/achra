import { test } from '../../../fixtures'

test('@feature should render the desktop navbar links at the default viewport', async ({
  homePage,
}) => {
  await homePage.goto()
  await homePage.navbar.expectDesktopLinksVisible()
})
