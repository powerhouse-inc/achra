import { test } from '../../fixtures'
import { getEnv } from '../../support/env'

test('@flow should render the operator profile with at least one service link', async ({
  operatorPage,
}) => {
  const { operatorSlug } = getEnv()
  await operatorPage.goto({ params: { operatorSlug } })
  await operatorPage.expectAtLeastOneService()
})
