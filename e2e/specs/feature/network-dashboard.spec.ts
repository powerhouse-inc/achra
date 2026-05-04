import { expect, test } from '../../fixtures'
import { getEnv } from '../../support/env'

/**
 * Conditional dashboard sections (details, governance, proposals, wallets,
 * roadmap) only render when the network has data for them. The pinned
 * `powerhouse` network reliably renders only `builders` and `finances` —
 * tests for the other sections self-skip when the anchor is absent so we
 * still exercise the assertion logic if the data ever comes back, without
 * registering a hard failure on every nightly run.
 */
test.describe('@feature network dashboard', () => {
  test('should render the builders section and scroll it into view', async ({
    networkDashboardPage,
  }) => {
    const { networkSlug } = getEnv()
    await networkDashboardPage.goto({ params: { slug: networkSlug } })
    await networkDashboardPage.scrollToSection('builders')
    await networkDashboardPage.expectSectionVisible('builders')
  })

  test('should render the finances section and scroll it into view', async ({
    networkDashboardPage,
  }) => {
    const { networkSlug } = getEnv()
    await networkDashboardPage.goto({ params: { slug: networkSlug } })
    await networkDashboardPage.scrollToSection('finances')
    await networkDashboardPage.expectSectionVisible('finances')
  })

  test('should render 0x-prefixed addresses in the wallets section when present', async ({
    networkDashboardPage,
    page,
  }) => {
    const { networkSlug } = getEnv()
    await networkDashboardPage.goto({ params: { slug: networkSlug } })
    const wallets = page.locator('#___SECTION___wallets')
    if ((await wallets.count()) === 0) {
      test.skip(true, 'Network has no wallets section in current data.')
    }
    await wallets.scrollIntoViewIfNeeded()
    const text = (await wallets.textContent()) ?? ''
    expect(text).toMatch(/0x[a-fA-F0-9]{4,}/)
  })

  test('should render content in the proposals section when present', async ({
    networkDashboardPage,
    page,
  }) => {
    const { networkSlug } = getEnv()
    await networkDashboardPage.goto({ params: { slug: networkSlug } })
    const proposals = page.locator('#___SECTION___proposals')
    if ((await proposals.count()) === 0) {
      test.skip(true, 'Network has no proposals section in current data.')
    }
    await proposals.scrollIntoViewIfNeeded()
    await expect(proposals).toBeVisible()
  })
})
