import { expect, test } from '../../../fixtures'
import { getEnv } from '../../../support/env'

/**
 * Pins the staging entities the rest of the suite depends on. If this test
 * fails, the slug in e2e/data/constants.ts is stale.
 */
test.describe('@smoke data validity', () => {
  test('should resolve the pinned network slug to a dashboard', async ({
    networkDashboardPage,
    page,
  }) => {
    const env = getEnv()
    await networkDashboardPage.goto({ params: { slug: env.networkSlug } })
    await expect(
      page,
      `Pinned network slug '${env.networkSlug}' did not load — update NETWORK_SLUG in e2e/data/constants.ts.`,
    ).toHaveURL(new RegExp(`/network/${env.networkSlug}\\b`))
  })
})
