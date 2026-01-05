import { SHOW_WHITELIST_OVERLAY } from '@/modules/whitelist/config/constants'
import type { FeatureFlags } from './types'

const ffProduction: FeatureFlags = {
  WHITELIST_OVERLAY_ENABLED: SHOW_WHITELIST_OVERLAY,
  GOVERNANCE_LINK_ENABLED: false,
  WORKSTREAMS_ENABLED: false,
  ROADMAPS_ENABLED: false,
  USE_BUILDERS_AS_NETWORK_HOMEPAGE: true,

  finances: {
    WALLETS_ENABLED: false,
    SUMMARY_SECTION_ENABLED: false,
    NAVIGATION_SECTION_ENABLED: false,
    BREAKDOWN_CHART_SECTION_ENABLED: false,
  },
}

export { ffProduction }
