import { test } from '../../../../fixtures'
import { getEnv } from '../../../../support/env'

test.describe('@smoke service-detail', () => {
  test('should load and render', async ({ serviceDetailPage, consoleErrors }) => {
    const { serviceSlug } = getEnv()
    await serviceDetailPage.goto({ params: { serviceSlug } })
    consoleErrors.assertNone()
  })
})
