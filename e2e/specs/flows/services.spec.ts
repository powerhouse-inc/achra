import { expect, test } from '../../fixtures'
import { getEnv } from '../../support/env'

test.describe('@flow services', () => {
  test('should narrow the visible cards via the search filter', async ({ servicesPage, page }) => {
    await servicesPage.goto()
    await servicesPage.expectAtLeastOneCard()
    await servicesPage.search('zzznever-matches-this-term')
    // The filter is debounced into the URL via nuqs; assert the URL syncs
    // first, then poll for the result set to drop to zero.
    await expect(page).toHaveURL(/[?&]search=zzznever/i)
    await expect.poll(async () => servicesPage.getCardsCount(), { timeout: 10_000 }).toBe(0)
  })

  test('should open the service profile with the purchase CTA visible when clicking a card', async ({
    servicesPage,
    serviceDetailPage,
  }) => {
    await servicesPage.goto()
    await servicesPage.openFirstCard()
    await serviceDetailPage.waitForReady()
    await serviceDetailPage.expectPurchaseCtaVisible()
  })

  test('should land on the purchase flow when clicking the purchase CTA', async ({
    serviceDetailPage,
    page,
  }) => {
    const { serviceSlug } = getEnv()
    await serviceDetailPage.goto({ params: { serviceSlug } })
    await serviceDetailPage.clickPurchaseCta()
    // The wizard auto-progresses past select-operator when there's a single
    // available operator (current dev/staging data), so we don't assert a
    // specific starting step — just that we're on the purchase route.
    await expect(page).toHaveURL(new RegExp(`/services/${serviceSlug}/purchase`))
    await expect(page).toHaveURL(/step=/)
  })
})
