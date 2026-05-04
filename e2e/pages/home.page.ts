import { expect, type Locator } from '@playwright/test'
import { BasePage } from './base/base-page'

/**
 * `/` — marketing homepage. Composed of HomeHero + several FadeInSection
 * blocks. The hero region carries `aria-labelledby="home-hero-heading"` so
 * we can use that landmark as the readiness signal.
 */
export class HomePage extends BasePage {
  readonly path = '/'

  protected readyLocator(): Locator {
    return this.page.locator('[aria-labelledby="home-hero-heading"]').first()
  }

  async expectMarketingSectionsVisible(): Promise<void> {
    // Each FadeInSection wraps a top-level section with a heading. We assert
    // the page has at least the FAQ section heading rendered, which sits near
    // the bottom of the page and confirms the full marketing fold rendered.
    await expect(
      this.page.getByRole('heading', { name: /FAQ|Frequently Asked/i }).first(),
    ).toBeVisible()
  }

  async expectHeroVisible(): Promise<void> {
    await expect(
      this.page.getByRole('heading', {
        level: 1,
        name: /Marketplace For Global Coordination/i,
      }),
    ).toBeVisible()
  }

  async expectSectionLandmarksPresent(): Promise<void> {
    // Each named section exposes `aria-labelledby="<heading-id>"` on its
    // `<section>`. The hero's H1 is rendered via `BlurText` and does not
    // forward the id to the DOM, so we assert on the labelled section
    // instead — which is what screen readers consume anyway.
    for (const id of ['home-hero-heading', 'home-faq-heading', 'home-waitlist-heading']) {
      await expect(this.page.locator(`[aria-labelledby="${id}"]`)).toBeAttached()
    }
  }

  private partnershipLink(): Locator {
    return this.page.locator('main a[href="https://sky.money"]').first()
  }

  async expectPartnershipLinkOpensInNewTab(): Promise<void> {
    const link = this.partnershipLink()
    await expect(link).toHaveAttribute('target', '_blank')
    await expect(link).toHaveAttribute('rel', /noopener/)
  }

  private faqTrigger(questionPattern: RegExp): Locator {
    return this.page.getByRole('button', { name: questionPattern })
  }

  async toggleFaq(questionPattern: RegExp): Promise<void> {
    // FaqSection lives inside a FadeInSection that fades in via Framer
    // Motion when it enters the viewport. Scroll the trigger in, give the
    // intersection observer a beat to flip `pointer-events`/`opacity`, then
    // dispatch the click programmatically so the sticky navbar can't shadow
    // a synthetic pointer event.
    const trigger = this.faqTrigger(questionPattern)
    await trigger.evaluate((el) => {
      el.scrollIntoView({ block: 'center' })
    })
    await expect(trigger).toBeVisible()
    // FadeInSection animates opacity from 0 → 1 once it intersects the
    // viewport. Webkit can hand back a stable layout slightly earlier than
    // Chromium, so wait for the wrapper to be fully opaque before clicking.
    await expect
      .poll(
        async () =>
          trigger.evaluate((el) => {
            let node: Element | null = el
            while (node) {
              const opacity = parseFloat(getComputedStyle(node).opacity)
              if (!Number.isNaN(opacity) && opacity < 1) return opacity
              node = node.parentElement
            }
            return 1
          }),
        { timeout: 5_000 },
      )
      .toBe(1)
    await trigger.click()
  }

  async expectFaqOpen(questionPattern: RegExp, answerPattern: RegExp): Promise<void> {
    const trigger = this.faqTrigger(questionPattern)
    await expect(trigger).toHaveAttribute('aria-expanded', 'true')
    await expect(this.page.getByText(answerPattern).first()).toBeVisible()
  }

  async expectFaqClosed(questionPattern: RegExp): Promise<void> {
    await expect(this.faqTrigger(questionPattern)).toHaveAttribute('aria-expanded', 'false')
  }

  private waitlistInput(): Locator {
    return this.page.locator('#home-waitlist-email')
  }

  private waitlistSubmit(): Locator {
    return this.page.locator('#home-waitlist-section button[type="submit"]')
  }

  async expectWaitlistInputContract(): Promise<void> {
    const input = this.waitlistInput()
    await expect(input).toHaveAttribute('type', 'email')
    await expect(input).toHaveAttribute('required', '')
    await expect(input).toHaveAttribute('name', 'email')
  }

  async expectWaitlistRejectsEmptySubmit(): Promise<void> {
    await this.waitlistSubmit().click()
    // HTML5 `required` blocks submission entirely — the input stays :invalid
    // and no success/error region appears. Assert the form did not advance.
    const isInvalid = await this.waitlistInput().evaluate(
      (el) => (el as HTMLInputElement).validity.valueMissing,
    )
    expect(isInvalid).toBe(true)
    await expect(this.page.locator('#home-waitlist-section [role="status"]')).toHaveCount(0)
  }
}
