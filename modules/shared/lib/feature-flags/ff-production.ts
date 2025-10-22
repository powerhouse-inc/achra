import { SHOW_WHITELIST_OVERLAY } from '../../config/constants'
import type { FeatureFlags } from './types'

const ffProduction: FeatureFlags = {
  FEATURE_WHITELIST_OVERLAY: SHOW_WHITELIST_OVERLAY,
}

export { ffProduction }
