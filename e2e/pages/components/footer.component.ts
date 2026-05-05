import { expect, type Locator } from '@playwright/test'
import { FOOTER_LINK_LABEL, type FooterLinkKey } from '../../data/footer-links'
import { BaseComponent } from '../base/base-component'

/**
 * The site footer renders link columns sourced from FOOTER_LINK_SECTIONS in
 * modules/shared/lib/constants.ts. External links are plain `<a target=_blank>`;
 * internal links are `<Link>` elements.
 *
 * Test contract: external link assertions inspect `href` and `target` rather
 * than navigating, because actual navigation to vetra.io / powerhouse.io /
 * academy.vetra.io would trigger a cross-origin browser context that adds
 * runtime + flake without signal.
 */
export class FooterComponent extends BaseComponent {
  private link(label: string): Locator {
    return this.root.getByRole('link', { name: label, exact: true }).first()
  }

  /**
   * Resolves the `href` attribute for a footer link without navigating.
   */
  async getHref(key: FooterLinkKey): Promise<string | null> {
    return this.link(FOOTER_LINK_LABEL[key]).getAttribute('href')
  }

  /**
   * Resolves the `target` attribute for a footer link.
   */
  async getTarget(key: FooterLinkKey): Promise<string | null> {
    return this.link(FOOTER_LINK_LABEL[key]).getAttribute('target')
  }

  async clickInternalLink(key: FooterLinkKey): Promise<void> {
    await this.link(FOOTER_LINK_LABEL[key]).click()
  }

  async expectVisible(): Promise<void> {
    await expect(this.root).toBeVisible()
  }
}
