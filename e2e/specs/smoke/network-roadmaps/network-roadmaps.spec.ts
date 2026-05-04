import { test } from '../../../fixtures'
import { getEnv } from '../../../support/env'

test.describe('@smoke network-roadmaps', () => {
  test('should load and render', async ({ networkRoadmapsPage, consoleErrors }) => {
    const { networkSlug } = getEnv()
    await networkRoadmapsPage.goto({ params: { slug: networkSlug } })
    consoleErrors.assertNone()
  })
})
