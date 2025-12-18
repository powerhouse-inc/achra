import { createSearchParamsCache, parseAsStringEnum } from 'nuqs/server'
import { GRANULARITY_OPTIONS, METRIC_OPTIONS } from '@/modules/finances/types'
export const metricParser = parseAsStringEnum(Object.values(METRIC_OPTIONS))

export const granularityParser = parseAsStringEnum(Object.values(GRANULARITY_OPTIONS))

export const breakdownChartSearchParamsCache = createSearchParamsCache({
  metric: metricParser,
  granularity: granularityParser,
})
