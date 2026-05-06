import { expect, test } from '../../../fixtures'

test.describe('@feature home', () => {
  test('should render the hero heading and section landmarks', async ({ homePage }) => {
    await homePage.goto()
    await homePage.expectHeroVisible()
    await homePage.expectSectionLandmarksPresent()
  })

  test('should render the FAQ section heading near the bottom of the marketing fold', async ({
    homePage,
  }) => {
    await homePage.goto()
    await homePage.expectMarketingSectionsVisible()
  })

  test('should link the hero CTAs to internal routes without broken hrefs', async ({
    homePage,
    page,
  }) => {
    await homePage.goto()
    const links = page.locator('main a[href]')
    const count = await links.count()
    for (let i = 0; i < count; i += 1) {
      const href = await links.nth(i).getAttribute('href')
      expect(href, `link #${i} has no href`).not.toBe('')
      expect(href, `link #${i} href is null`).not.toBeNull()
    }
  })

  test('should open the Sky partnership link in a new tab with rel=noopener', async ({
    homePage,
  }) => {
    await homePage.goto()
    await homePage.expectPartnershipLinkOpensInNewTab()
  })
})

test.describe('@feature home faq', () => {
  const firstQuestion = /How does Achra help network organizations scale/i
  const firstAnswer = /Achra lowers the costs of coordination/i
  const secondQuestion = /How does Achra connect governance with day-to-day execution/i
  const secondAnswer = /Governance decisions are not left onchain/i

  test('should expand and collapse a question on click', async ({ homePage }) => {
    await homePage.goto()
    await homePage.expectFaqClosed(firstQuestion)
    await homePage.toggleFaq(firstQuestion)
    await homePage.expectFaqOpen(firstQuestion, firstAnswer)
    await homePage.toggleFaq(firstQuestion)
    await homePage.expectFaqClosed(firstQuestion)
  })

  test('should keep the first item open when a second one is opened', async ({ homePage }) => {
    await homePage.goto()
    await homePage.toggleFaq(firstQuestion)
    await homePage.toggleFaq(secondQuestion)
    await homePage.expectFaqOpen(firstQuestion, firstAnswer)
    await homePage.expectFaqOpen(secondQuestion, secondAnswer)
  })
})

test.describe('@feature home waitlist', () => {
  test('should expose the email input as required type=email', async ({ homePage }) => {
    await homePage.goto()
    await homePage.expectWaitlistInputContract()
  })

  test('should not submit an empty form (HTML5 required)', async ({ homePage }) => {
    await homePage.goto()
    await homePage.expectWaitlistRejectsEmptySubmit()
  })

  // Happy path is intentionally omitted: the success branch calls Mailchimp
  // server-side via `subscribeOrTagMember`, which `page.route` cannot
  // intercept. Add it once the suite gains a server-side mock layer (e.g. an
  // env-gated stub or MSW for Node).
})
