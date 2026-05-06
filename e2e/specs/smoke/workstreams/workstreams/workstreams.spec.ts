import ff from '@/modules/shared/lib/feature-flags'
import { expect, test } from '../../../../fixtures'

/**
 * `/workstreams` is gated by `workstreams.WORKSTREAMS_ENABLED`. Staging +
 * production keep it off (renders 404), dev keeps it on. We resolve the flag
 * the same way the app does (via `process.env.NEXT_PUBLIC_ENVIRONMENT`) and
 * skip when it's off, so the spec auto-activates the moment the flag flips
 * on for the test env.
 */
test.describe('@smoke workstreams', () => {
  test('should load and render', async ({ workstreamsPage, page, consoleErrors }) => {
    test.skip(
      !ff.workstreams.WORKSTREAMS_ENABLED,
      `WORKSTREAMS_ENABLED is off for NEXT_PUBLIC_ENVIRONMENT="${process.env.NEXT_PUBLIC_ENVIRONMENT}"; /workstreams returns 404.`,
    )
    const response = await page.goto('/workstreams', { waitUntil: 'domcontentloaded' })
    expect(response?.status()).toBeLessThan(500)
    await workstreamsPage.waitForReady()
    consoleErrors.assertNone()
  })
})
