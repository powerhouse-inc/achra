import { SHOW_WHITELIST_OVERLAY } from '@/modules/whitelist/config/constants'
import type { FeatureFlags } from './types'

const ffDev: FeatureFlags = {
  WHITELIST_OVERLAY_ENABLED: SHOW_WHITELIST_OVERLAY,
  WORKSTREAMS_ENABLED: true,
  USE_BUILDERS_AS_NETWORK_HOMEPAGE: false,
}

export { ffDev }
