import { ENVIRONMENT } from '@/modules/shared/config/constants'
import { ffDev } from './ff.dev'
import { ffProduction } from './ff.production'
import { ffStaging } from './ff.staging'

export const allFeatureFlags = {
  dev: ffDev,
  staging: ffStaging,
  production: ffProduction,
}

const ff =
  ENVIRONMENT === 'development' ? ffDev : ENVIRONMENT === 'staging' ? ffStaging : ffProduction

export default ff
