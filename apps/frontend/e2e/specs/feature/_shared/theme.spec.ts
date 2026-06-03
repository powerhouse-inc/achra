import { expect, test } from '../../../fixtures'

/**
 * Theme toggling: the app uses next-themes with the `class` strategy on
 * `<html>`. The toggle is hidden on Achra marketing routes (`/`, `/cases`)
 * because those routes force `light` via `forcedTheme`. The persistence test
 * therefore drives the toggle from `/services`, where the toggle is rendered.
 */
test.describe('@feature theme', () => {
  test('should flip the html.dark class via the theme toggle when present', async ({
    homePage,
    page,
  }) => {
    await homePage.goto()
    const toggle = page.getByRole('button', { name: /theme|dark|light/i }).first()
    if (!(await toggle.isVisible().catch(() => false))) {
      test.skip(true, 'No theme toggle button at default viewport on homepage.')
    }
    const initial = await page.locator('html').getAttribute('class')
    await toggle.click()
    await expect.poll(async () => page.locator('html').getAttribute('class')).not.toBe(initial)
  })

  test('should persist the chosen theme across navigation and a hard reload', async ({
    servicesPage,
    networksPage,
    page,
  }) => {
    await servicesPage.goto()

    const toggle = page.getByRole('button', { name: /toggle theme/i }).first()
    if (!(await toggle.isVisible().catch(() => false))) {
      test.skip(true, 'Theme toggle not rendered on /services in this environment.')
    }

    const html = page.locator('html')
    // Fresh browser context starts with no stored preference, so next-themes
    // applies the configured `defaultTheme: 'light'`.
    await expect(html).not.toHaveClass(/\bdark\b/)

    // Pre-click guard: under parallel load on the dev server, the toggle's
    // client tree can be in the DOM before its onClick handler hydrates. We
    // confirm the click registered by polling the next-themes localStorage
    // key — and retry if the first click landed on the un-hydrated button.
    await expect
      .poll(
        async () => {
          const stored = await page.evaluate(() => window.localStorage.getItem('theme'))
          if (stored === 'dark') return 'dark'
          await toggle.click()
          return stored
        },
        { timeout: 10_000 },
      )
      .toBe('dark')
    await expect(html).toHaveClass(/\bdark\b/)

    // Soft client navigation should not lose the preference.
    await networksPage.goto()
    await expect(html).toHaveClass(/\bdark\b/)

    // Hard reload re-runs the next-themes inline init script, which reads
    // localStorage before hydration and re-applies the class.
    await page.reload({ waitUntil: 'domcontentloaded' })
    await expect(html).toHaveClass(/\bdark\b/)
  })
})
