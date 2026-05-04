import { expect, test } from '../../../fixtures'
import { getEnv } from '../../../support/env'

/**
 * Pins the staging entities the rest of the suite depends on. If this test
 * fails, the named env var (or e2e/data/constants.ts fallback) is stale.
 * Failure message points the reader at the variable to update.
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
      `Pinned network slug '${env.networkSlug}' did not load — set E2E_NETWORK_SLUG or update e2e/data/constants.ts.`,
    ).toHaveURL(new RegExp(`/network/${env.networkSlug}\\b`))
  })
})
