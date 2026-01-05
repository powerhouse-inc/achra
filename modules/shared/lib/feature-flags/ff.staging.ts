import { SHOW_WHITELIST_OVERLAY } from '@/modules/whitelist/config/constants'
import type { FeatureFlags } from './types'

const ffStaging: FeatureFlags = {
  WHITELIST_OVERLAY_ENABLED: SHOW_WHITELIST_OVERLAY,
  GOVERNANCE_LINK_ENABLED: false,
  ROADMAPS_ENABLED: false,
  USE_BUILDERS_AS_NETWORK_HOMEPAGE: true,

  workstreams: {
    WORKSTREAMS_ENABLED: false,
    PROJECT_DETAILS_ENABLED: false,
    INITIAL_PROPOSAL_ENABLED: false,
    RFP_ENABLED: false,
  },

  finances: {
    WALLETS_ENABLED: false,
    SUMMARY_SECTION_ENABLED: false,
    NAVIGATION_SECTION_ENABLED: false,
    BREAKDOWN_CHART_SECTION_ENABLED: false,
  },
}

export { ffStaging }
