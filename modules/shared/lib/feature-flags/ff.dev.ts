import { SHOW_WHITELIST_OVERLAY } from '@/modules/whitelist/config/constants'
import type { FeatureFlags } from './types'

const ffDev: FeatureFlags = {
  WHITELIST_OVERLAY_ENABLED: SHOW_WHITELIST_OVERLAY,
  GOVERNANCE_LINK_ENABLED: true,
  WORKSTREAMS_ENABLED: true,
  USE_BUILDERS_AS_NETWORK_HOMEPAGE: false,

  finances: {
    WALLETS_ENABLED: true,
    SUMMARY_SECTION_ENABLED: true,
    NAVIGATION_SECTION_ENABLED: true,
    BREAKDOWN_CHART_SECTION_ENABLED: true,
  },
}

export { ffDev }
