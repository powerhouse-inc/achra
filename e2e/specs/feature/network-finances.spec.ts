import { test } from '../../fixtures'
import { getEnv } from '../../support/env'

test('@feature should load the network finances subroute', async ({ networkFinancesPage }) => {
  const { networkSlug } = getEnv()
  await networkFinancesPage.goto({ params: { slug: networkSlug } })
  await networkFinancesPage.expectLoadedWithoutCrash()
})
