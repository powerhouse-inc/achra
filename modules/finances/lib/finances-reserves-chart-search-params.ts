import {
  createSearchParamsCache,
  parseAsArrayOf,
  parseAsString,
  parseAsStringEnum,
} from 'nuqs/server'
import { GRANULARITY_OPTIONS } from '@/modules/finances/types'

export const reservesGranularityParser = parseAsStringEnum(
  Object.values(GRANULARITY_OPTIONS),
).withDefault(GRANULARITY_OPTIONS.Monthly)

export const reservesCategoriesParser = parseAsArrayOf(parseAsString)

export const yearParser = parseAsString.withDefault('2025')

export const financesReservesChartSearchParamsCache = createSearchParamsCache({
  reservesGranularity: reservesGranularityParser,
  reservesCategories: reservesCategoriesParser,
  year: yearParser,
})
