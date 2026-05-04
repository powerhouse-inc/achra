import { expect, test } from '../../../fixtures'
import { getEnv } from '../../../support/env'

test.describe('@feature services', () => {
  test('should render at least one card with a /services/ href in the listing', async ({
    servicesPage,
    page,
  }) => {
    await servicesPage.goto()
    await servicesPage.expectAtLeastOneCard()
    const links = page.locator(
      'a[href^="/services/"]:not([href*="/operators/"]):not([href*="/purchase"])',
    )
    const first = links.first()
    const href = await first.getAttribute('href')
    expect(href).toMatch(/^\/services\/[a-z0-9-]+/i)
  })

  test('should narrow the listing on a likely-empty search term', async ({
    servicesPage,
    page,
  }) => {
    await servicesPage.goto()
    await servicesPage.expectAtLeastOneCard()
    await servicesPage.search('zzzzznever-matches-this-term')
    await expect(page).toHaveURL(/[?&]search=zzzzznever/i)
    await expect.poll(async () => servicesPage.getCardsCount(), { timeout: 10_000 }).toBe(0)
  })

  test('should render the not-found state for a non-existent service slug', async ({ page }) => {
    // Next.js dev serves not-found.tsx with status 200; check content.
    await page.goto('/services/__missing_service__', { waitUntil: 'domcontentloaded' })
    await expect(page.getByText(/Page not found/i)).toBeVisible()
  })

  test('should render the main heading and purchase CTA on the service profile', async ({
    serviceDetailPage,
  }) => {
    const { serviceSlug } = getEnv()
    await serviceDetailPage.goto({ params: { serviceSlug } })
    await serviceDetailPage.expectPurchaseCtaVisible()
  })
})
