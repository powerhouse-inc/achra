import { FOOTER_LINKS } from '../../../data/footer-links'
import { expect, test } from '../../../fixtures'

test.describe('@feature footer', () => {
  test('should navigate to /cases via the internal "Use Cases" link', async ({
    homePage,
    page,
  }) => {
    await homePage.goto()
    await homePage.footer.clickInternalLink('useCases')
    await expect(page).toHaveURL(/\/cases$/)
  })

  test('should expose the root path as the href of the internal "Explore Achra" link', async ({
    homePage,
  }) => {
    await homePage.goto()
    expect(await homePage.footer.getHref('exploreAchra')).toBe(FOOTER_LINKS.exploreAchra)
  })
})

test.describe('@feature footer external links', () => {
  test('should expose the Vetra link as an external href with target=_blank', async ({
    homePage,
  }) => {
    await homePage.goto()
    expect(await homePage.footer.getHref('exploreVetra')).toBe(FOOTER_LINKS.exploreVetra)
    expect(await homePage.footer.getTarget('exploreVetra')).toBe('_blank')
  })

  test('should expose the Powerhouse "About us" link as an external href with target=_blank', async ({
    homePage,
  }) => {
    await homePage.goto()
    expect(await homePage.footer.getHref('aboutUs')).toBe(FOOTER_LINKS.aboutUs)
    expect(await homePage.footer.getTarget('aboutUs')).toBe('_blank')
  })

  test('should expose the Academy link as an external href with target=_blank', async ({
    homePage,
  }) => {
    await homePage.goto()
    expect(await homePage.footer.getHref('academy')).toBe(FOOTER_LINKS.academy)
    expect(await homePage.footer.getTarget('academy')).toBe('_blank')
  })
})
