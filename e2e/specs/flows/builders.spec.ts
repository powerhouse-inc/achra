import { expect, test } from '../../fixtures'
import { getEnv } from '../../support/env'

test.describe('@flow builders', () => {
  test('should render at least one row in the builders list', async ({ buildersListPage }) => {
    const { networkSlug } = getEnv()
    await buildersListPage.goto({ params: { slug: networkSlug } })
    await buildersListPage.expectAtLeastOneBuilder()
  })

  test('should navigate to the builder profile route when opening a builder', async ({
    buildersListPage,
    builderProfilePage,
    page,
  }) => {
    const { networkSlug } = getEnv()
    await buildersListPage.goto({ params: { slug: networkSlug } })
    await buildersListPage.expectAtLeastOneBuilder()
    const { slug: builderSlug } = await buildersListPage.openFirstBuilder()
    await builderProfilePage.waitForReady()
    await expect(page).toHaveURL(new RegExp(`/builders/${builderSlug}\\b`))
  })

  test('should render skills and description sections on the builder profile', async ({
    builderProfilePage,
  }) => {
    const env = getEnv()
    await builderProfilePage.goto({
      params: { slug: env.networkSlug, builderSlug: env.builderSlug },
    })
    await builderProfilePage.expectSkillsAndDescriptionVisible()
  })
})
