import { encodeSectionId } from '@/modules/shared/components/section-activation'
import { NetworkHomepageSections } from '@/modules/shared/config/constants'

/**
 * Network profile document ID in Switchboard/Connect
 */
export const NETWORK_PROFILE_DOCUMENT_ID = '76314398-e7ad-4925-aad4-e994b8f6eb16'
/**
 * Network profile document type in Switchboard/Connect
 */
export const NETWORK_PROFILE_DOCUMENT_TYPE = 'powerhouse/network-profile'

/**
 * Storage key for the homepage banner expanded state
 */
export const HOME_BANNER_EXPANDED_STORAGE_KEY = 'home-banner-expanded'

/**
 * Network homepage sections IDs
 */
export const NETWORK_HOMEPAGE_SECTIONS = [
  NetworkHomepageSections.Proposals,
  NetworkHomepageSections.Roadmap,
  NetworkHomepageSections.Finances,
  NetworkHomepageSections.Wallets,
  NetworkHomepageSections.Builders,
  NetworkHomepageSections.Governance,
]

/**
 * Network homepage sections IDs encoded
 */
export const NETWORK_HOMEPAGE_SECTIONS_ENCODED = NETWORK_HOMEPAGE_SECTIONS.map((section) =>
  encodeSectionId(section),
)

/**
 * Network homepage skip section
 */
export const NETWORK_HOMEPAGE_SKIP_SECTION = NetworkHomepageSections.Proposals
