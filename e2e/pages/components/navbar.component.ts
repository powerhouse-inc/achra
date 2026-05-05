import { expect, type Locator } from '@playwright/test'
import { BaseComponent } from '../base/base-component'

/**
 * Achra primary navbar. Selectors are sourced from the live ACHRA_NAVBAR_LINKS
 * config in modules/shared/config/navbar-config.ts:
 *   - Networks
 *   - Operational Hub (external; lives on https://www.operationalhub.io/contact)
 *   - Services
 *   - Use Cases
 *   - Workstreams (gated by feature flag — disabled in staging mode)
 *
 * Mobile renders the same labels inside a dropdown trigger; lg breakpoint
 * shows them inline. We expose intent methods that work on either layout.
 */
export class NavbarComponent extends BaseComponent {
  private link(label: string): Locator {
    return this.root.getByRole('link', { name: label, exact: true }).first()
  }

  private mobileTrigger(): Locator {
    return this.root.getByRole('button', { name: /Navigation menu/i })
  }

  /**
   * Mobile menu items live inside a Radix DropdownMenuContent that is rendered
   * via Portal — i.e., outside the `<header>` root we scope to. We resolve the
   * Page from the root locator and search globally for the `menuitem` role.
   * `asChild` on DropdownMenuItem forwards `role="menuitem"` to the underlying
   * `<a>`, so this matches the link without colliding with footer/nav links
   * that use the implicit `link` role.
   */
  private mobileMenuItem(label: string): Locator {
    return this.root.page().getByRole('menuitem', { name: label, exact: true })
  }

  private brandHomeLink(): Locator {
    return this.root.getByRole('link', { name: /Achra homepage/i }).first()
  }

  private async openIfMobile(): Promise<void> {
    const trigger = this.mobileTrigger()
    if (await trigger.isVisible().catch(() => false)) {
      await trigger.click()
    }
  }

  async navigateToNetworks(): Promise<void> {
    await this.openIfMobile()
    await this.link('Networks').click()
  }

  async navigateToServices(): Promise<void> {
    await this.openIfMobile()
    await this.link('Services').click()
  }

  async navigateToUseCases(): Promise<void> {
    await this.openIfMobile()
    await this.link('Use Cases').click()
  }

  /**
   * Returns the resolved href on the Operational Hub link without navigating.
   * The link points to an external URL, so we validate the contract via href
   * inspection rather than triggering a real cross-origin nav from a test.
   */
  async getOperationalHubHref(): Promise<string | null> {
    await this.openIfMobile()
    return this.link('Operational Hub').getAttribute('href')
  }

  async expectMobileMenuVisible(): Promise<void> {
    await expect(this.mobileTrigger()).toBeVisible()
  }

  async expectDesktopLinksVisible(): Promise<void> {
    await expect(this.link('Networks')).toBeVisible()
    await expect(this.link('Services')).toBeVisible()
    await expect(this.link('Use Cases')).toBeVisible()
  }

  /**
   * Open the mobile dropdown trigger and click an internal nav link by its
   * exact label (e.g. 'Networks', 'Services', 'Use Cases'). Use this in
   * `@mobile`-tagged specs where the desktop inline nav is collapsed.
   *
   * The trigger lives in a `<Suspense>` boundary in the navbar. Radix renders
   * the SSR shell (including `aria-haspopup` / `data-state="closed"`) before
   * the React tree hydrates, so static attribute checks aren't a reliable
   * hydration signal. We instead poll: click the trigger and wait briefly for
   * Radix to set `data-state="open"`. If it doesn't, retry — the first click
   * landed before the handler was bound and was dropped.
   */
  async clickMobileMenuLink(label: string): Promise<void> {
    const trigger = this.mobileTrigger()
    const menu = this.root.page().getByRole('menu').first()

    await trigger.click()
    const maxAttempts = 4
    for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
      try {
        await menu.waitFor({ state: 'visible', timeout: 2000 })
        break
      } catch {
        if (attempt === maxAttempts - 1) {
          throw new Error(
            `Mobile navigation menu did not open after ${maxAttempts} click attempts.`,
          )
        }
        await trigger.click()
      }
    }
    await this.mobileMenuItem(label).click()
  }

  /**
   * Click the Achra brand logo (left side of the navbar). Always navigates to
   * `/`. Used by the not-found shell to verify the user can return home.
   */
  async clickBrandHomeLink(): Promise<void> {
    await this.brandHomeLink().click()
  }
}
