import { test } from '../../fixtures'

test('@feature should render cards on the cases page', async ({ casesPage }) => {
  await casesPage.goto()
  await casesPage.expectAtLeastOneCard()
})
