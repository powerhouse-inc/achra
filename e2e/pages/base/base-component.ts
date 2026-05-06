import type { Locator } from '@playwright/test'

/**
 * Abstract component object. Constructed with a scoping `Locator` (typically
 * the `<header>`, `<footer>`, or another semantic region of a page). Never
 * receives a raw `Page` — that forces composition via the page's `getByRole`
 * region locators and prevents components from drifting outside their scope.
 */
export abstract class BaseComponent {
  protected readonly root: Locator

  constructor(root: Locator) {
    this.root = root
  }
}
