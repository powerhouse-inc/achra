import { test } from '../../../fixtures'

test.describe('@smoke cases', () => {
  test('should render case cards on /cases', async ({ casesPage }) => {
    await casesPage.goto()
    await casesPage.expectAtLeastOneCard()
  })
})
