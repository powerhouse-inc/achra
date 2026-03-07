import {
  ENABLE_SERVICE_PURCHASE_STORE_PERSISTENCE,
  LEAVE_PAGE_GUARD_ENABLED,
} from '@/modules/service-purchase/config/constants'
import { SHOW_WHITELIST_OVERLAY } from '@/modules/whitelist/config/constants'
import type { FeatureFlags } from './types'

const ffStaging: FeatureFlags = {
  WHITELIST_OVERLAY_ENABLED: SHOW_WHITELIST_OVERLAY,
  GOVERNANCE_LINK_ENABLED: false,
  ROADMAPS_ENABLED: false,
  USE_BUILDERS_AS_NETWORK_HOMEPAGE: true,
  builders: {
    FINANCES_LINK_ENABLED: false,
    CONNECT_LINK_ENABLED: false,
    PROJECTS_SECTION_ENABLED: false,
  },

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
    BREAKDOWN_TABLE_SECTION_ENABLED: true,
    YEAR_SELECTOR_ENABLED: false,
  },
  NAV_BAR_LOGIN_BUTTON_ENABLED: false,
  ENABLE_SERVICE_PURCHASE_STORE_PERSISTENCE,
  LEAVE_PAGE_GUARD_ENABLED,
}

export { ffStaging }
