import { test } from '../../../fixtures'
import { getEnv } from '../../../support/env'

test.describe('@smoke builder-profile', () => {
  test('should load and render', async ({ builderProfilePage, consoleErrors }) => {
    const { networkSlug, builderSlug } = getEnv()
    await builderProfilePage.goto({ params: { slug: networkSlug, builderSlug } })
    consoleErrors.assertNone()
  })
})
