import { test } from '../../../../fixtures'
import { getEnv } from '../../../../support/env'

test.describe('@smoke operator', () => {
  test('should load and render', async ({ operatorPage, consoleErrors }) => {
    const { operatorSlug } = getEnv()
    await operatorPage.goto({ params: { operatorSlug } })
    consoleErrors.assertNone()
  })
})
