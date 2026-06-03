import { test } from '../../../../fixtures'
import { getEnv } from '../../../../support/env'

test.describe('@smoke service-purchase', () => {
  test('should load and render', async ({ purchaseFlow, consoleErrors }) => {
    const { serviceSlug } = getEnv()
    await purchaseFlow.goto({ params: { serviceSlug } })
    consoleErrors.assertNone()
  })
})
