import { expect, test } from '../../../../fixtures'

/**
 * `/workstreams` is gated by `WORKSTREAMS_ENABLED`. Staging + production keep
 * it off (renders 404), dev keeps it on. The smoke skips itself if the page
 * 404s so it auto-activates the moment the flag flips on for the test env.
 */
test.describe('@smoke workstreams', () => {
  test('should load and render', async ({ workstreamsPage, page, consoleErrors }) => {
    const response = await page.goto('/workstreams', { waitUntil: 'domcontentloaded' })
    if (await page.getByText(/Page not found/i).isVisible().catch(() => false)) {
      test.skip(true, 'WORKSTREAMS_ENABLED is off in this environment; /workstreams returns 404.')
    }
    expect(response?.status() ?? 0).toBeLessThan(500)
    await workstreamsPage.waitForReady()
    consoleErrors.assertNone()
  })
})
