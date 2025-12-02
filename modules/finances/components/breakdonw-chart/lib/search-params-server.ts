import { createSearchParamsCache, parseAsStringEnum } from 'nuqs/server'
import {
  GRANULARITY_OPTIONS,
  type GranularityType,
  METRIC_OPTIONS,
  type MetricType,
} from '../types'
export const metricParser = parseAsStringEnum<MetricType>([...METRIC_OPTIONS])

export const granularityParser = parseAsStringEnum<GranularityType>([...GRANULARITY_OPTIONS])

export const breakdownChartSearchParamsCache = createSearchParamsCache({
  metric: metricParser,
  granularity: granularityParser,
})
