import { SHOW_WHITELIST_OVERLAY } from '@/modules/whitelist/config/constants'
import type { FeatureFlags } from './types'

const ffDev: FeatureFlags = {
  WHITELIST_OVERLAY_ENABLED: SHOW_WHITELIST_OVERLAY,
  GOVERNANCE_LINK_ENABLED: true,
  ROADMAPS_ENABLED: true,
  USE_BUILDERS_AS_NETWORK_HOMEPAGE: false,

  builders: {
    FINANCES_LINK_ENABLED: true,
    CONNECT_LINK_ENABLED: true,
    PROJECTS_SECTION_ENABLED: true,
  },

  workstreams: {
    WORKSTREAMS_ENABLED: true,
    PROJECT_DETAILS_ENABLED: true,
    INITIAL_PROPOSAL_ENABLED: true,
    RFP_ENABLED: true,
  },

  finances: {
    WALLETS_ENABLED: true,
    SUMMARY_SECTION_ENABLED: true,
    NAVIGATION_SECTION_ENABLED: true,
    BREAKDOWN_CHART_SECTION_ENABLED: true,
  },
}

export { ffDev }
