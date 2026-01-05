import { SHOW_WHITELIST_OVERLAY } from '@/modules/whitelist/config/constants'
import type { FeatureFlags } from './types'

const ffProduction: FeatureFlags = {
  WHITELIST_OVERLAY_ENABLED: SHOW_WHITELIST_OVERLAY,
  WORKSTREAMS_ENABLED: false,
}

export { ffProduction }
