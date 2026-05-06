import { test } from '../../../fixtures'
import { getEnv } from '../../../support/env'

test.describe('@smoke network-finances', () => {
  test('should load and render', async ({ networkFinancesPage, consoleErrors }) => {
    const { networkSlug } = getEnv()
    await networkFinancesPage.goto({ params: { slug: networkSlug } })
    consoleErrors.assertNone()
  })
})
