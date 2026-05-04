import { RELIABLE_DASHBOARD_SECTIONS } from '../../data/constants'
import { test } from '../../fixtures'
import { getEnv } from '../../support/env'

test.describe('@flow network dashboard', () => {
  test('should render and scroll into view the reliable dashboard section anchors', async ({
    networkDashboardPage,
  }) => {
    const { networkSlug } = getEnv()
    await networkDashboardPage.goto({ params: { slug: networkSlug } })

    for (const section of RELIABLE_DASHBOARD_SECTIONS) {
      await networkDashboardPage.scrollToSection(section)
      await networkDashboardPage.expectSectionVisible(section)
    }
  })

  test('should render the finances subroute without crashing', async ({ networkFinancesPage }) => {
    const { networkSlug } = getEnv()
    await networkFinancesPage.goto({ params: { slug: networkSlug } })
    await networkFinancesPage.expectLoadedWithoutCrash()
  })

  test('should render the roadmaps subroute (milestones or empty-state)', async ({
    networkRoadmapsPage,
  }) => {
    const { networkSlug } = getEnv()
    await networkRoadmapsPage.goto({ params: { slug: networkSlug } })
    await networkRoadmapsPage.expectMilestoneListVisible()
  })

  test('should anchor the builders section into view', async ({ networkDashboardPage }) => {
    const { networkSlug } = getEnv()
    await networkDashboardPage.goto({ params: { slug: networkSlug } })
    await networkDashboardPage.scrollToSection('builders')
    await networkDashboardPage.expectSectionVisible('builders')
  })
})
