/**
 * Application environment
 */
export const ENVIRONMENT = process.env.NEXT_PUBLIC_ENVIRONMENT

/**
 * Fast refresh interval for UseQuery to refetch data every X interval
 */
export const FAST_REFRESH_INTERVAL = 5000 // 5 seconds

/**
 * Base URL for the application
 */
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://achra.com'

/**
 * Network homepage sections IDs for hash navigation
 */
export enum NetworkHomepageSections {
  Proposals = 'proposals',
  Roadmap = 'roadmap',
  Finances = 'finances',
  Wallets = 'wallets',
  Builders = 'builders',
  Governance = 'governance',
}

/**
 * Scroll margin classes for sections, taking in consideration the navbar height
 */
export const SCROLL_MT_CLASSES = 'scroll-mt-22 sm:scroll-mt-28'

/**
 * Configurable threshold: percentage from top of viewport (0-100)
 * to activate the section.
 *
 * @default 20
 */
export const DEFAULT_SECTION_ACTIVATION_THRESHOLD = 20

/**
 * Delay before scrolling to the section.
 *
 * @default 500
 */
export const SECTION_SCROLL_RESTORATION_DELAY = 500

/**
 * Additional buffer time to ensure smooth scroll completes before re-enabling hash updates
 *
 * @default 400
 */
export const SMOOTH_SCROLL_BUFFER = 400
