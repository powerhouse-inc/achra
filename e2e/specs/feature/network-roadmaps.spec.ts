import { test } from '../../fixtures'
import { getEnv } from '../../support/env'

test('@feature should load the network roadmaps page', async ({ networkRoadmapsPage }) => {
  const { networkSlug } = getEnv()
  await networkRoadmapsPage.goto({ params: { slug: networkSlug } })
  await networkRoadmapsPage.expectMilestoneListVisible()
})
