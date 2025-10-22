import { ffDev } from './ff-dev'
import { ffProduction } from './ff-production'

const featureFlags = process.env.NODE_ENV === 'development' ? ffDev : ffProduction

export default featureFlags
