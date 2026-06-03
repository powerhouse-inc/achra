import { test } from '../../../fixtures'
import { getEnv } from '../../../support/env'

test.describe('@smoke builders', () => {
  test('should load and render', async ({ buildersListPage, consoleErrors }) => {
    const { networkSlug } = getEnv()
    await buildersListPage.goto({ params: { slug: networkSlug } })
    consoleErrors.assertNone()
  })
})
