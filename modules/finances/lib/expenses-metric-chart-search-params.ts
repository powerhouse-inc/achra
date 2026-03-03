import { createSearchParamsCache, parseAsString, parseAsStringEnum } from 'nuqs/server'
import { GRANULARITY_OPTIONS, METRIC_OPTIONS } from '@/modules/finances/types'
export const metricParser = parseAsStringEnum(Object.values(METRIC_OPTIONS)).withDefault(
  METRIC_OPTIONS.Budget,
)

export const granularityParser = parseAsStringEnum(Object.values(GRANULARITY_OPTIONS)).withDefault(
  GRANULARITY_OPTIONS.Monthly,
)

export const year = parseAsString.withDefault('2025')
export const expensesMetricChartSearchParamsCache = createSearchParamsCache({
  metric: metricParser,
  granularity: granularityParser,
  year,
})
