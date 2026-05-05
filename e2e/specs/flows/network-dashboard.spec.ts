import ff from '@/modules/shared/lib/feature-flags'
import { RELIABLE_DASHBOARD_SECTIONS } from '../../data/constants'
import { expect, test } from '../../fixtures'
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

  // `/network/[slug]/roadmaps` is gated by `ROADMAPS_ENABLED`. Staging +
  // production keep it off (renders 404), dev keeps it on. We resolve the
  // flag the same way the app does (via `process.env.NEXT_PUBLIC_ENVIRONMENT`)
  // and skip when it's off, so the spec auto-activates the moment the flag
  // flips on for the test env.
  test('should render the roadmaps subroute (milestones or empty-state)', async ({
    networkRoadmapsPage,
    page,
  }) => {
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
    await networkRoadmapsPage.expectMilestoneListVisible()
  })

  test('should anchor the builders section into view', async ({ networkDashboardPage }) => {
    const { networkSlug } = getEnv()
    await networkDashboardPage.goto({ params: { slug: networkSlug } })
    await networkDashboardPage.scrollToSection('builders')
    await networkDashboardPage.expectSectionVisible('builders')
  })
})
