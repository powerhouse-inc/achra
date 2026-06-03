/**
 * Expected outbound URLs from the footer. Intentionally hardcoded so a footer
 * link change forces an explicit test update — these links are part of the
 * brand-level surface and should not silently drift.
 *
 * The Vetra/Powerhouse/Academy URLs are sourced from
 * modules/shared/components/footer/footer.tsx.
 */
/**
 * URLs matched verbatim against the `href` attribute (not against navigated
 * URLs, which the browser may normalize). Sourced from
 * modules/shared/lib/constants.ts FOOTER_LINK_SECTIONS.
 */
export const FOOTER_LINKS = {
  exploreAchra: '/',
  exploreVetra: 'https://vetra.io',
  useCases: '/cases',
  aboutUs: 'https://powerhouse.io',
  academy: 'https://academy.vetra.io',
} as const

export type FooterLinkKey = keyof typeof FOOTER_LINKS

/**
 * Link labels as rendered in the footer DOM, sourced from
 * FOOTER_LINK_SECTIONS. Used by FooterComponent for role-based selection.
 */
export const FOOTER_LINK_LABEL: Record<FooterLinkKey, string> = {
  exploreAchra: 'Explore Achra',
  exploreVetra: 'Explore Vetra',
  useCases: 'Use Cases',
  aboutUs: 'About us',
  academy: 'Academy',
}
