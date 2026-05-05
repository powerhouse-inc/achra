import ff from '@/modules/shared/lib/feature-flags'
import { expect, test } from '../../../fixtures'
import { getEnv } from '../../../support/env'

/**
 * `/network/[slug]/roadmaps` is gated by `ROADMAPS_ENABLED`. Staging +
 * production keep it off (renders 404), dev keeps it on. We resolve the flag
 * the same way the app does (via `process.env.NEXT_PUBLIC_ENVIRONMENT`) and
 * skip when it's off, so the spec auto-activates the moment the flag flips
 * on for the test env.
 */
test.describe('@smoke network-roadmaps', () => {
  test('should load and render', async ({ networkRoadmapsPage, page, consoleErrors }) => {
    test.skip(
      !ff.ROADMAPS_ENABLED,
      `ROADMAPS_ENABLED is off for NEXT_PUBLIC_ENVIRONMENT="${process.env.NEXT_PUBLIC_ENVIRONMENT}"; /network/:slug/roadmaps returns 404.`,
    )
    const { networkSlug } = getEnv()
    const response = await page.goto(`/network/${encodeURIComponent(networkSlug)}/roadmaps`, {
      waitUntil: 'domcontentloaded',
    })
    expect(response?.status()).toBeLessThan(500)
    await networkRoadmapsPage.waitForReady()
    consoleErrors.assertNone()
  })
})
