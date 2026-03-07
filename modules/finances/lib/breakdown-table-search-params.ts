import { createSearchParamsCache, parseAsArrayOf, parseAsStringEnum } from 'nuqs/server'
import { GRANULARITY_OPTIONS, METRIC_OPTIONS } from '@/modules/finances/types'

export const btMetricsParser = parseAsArrayOf(parseAsStringEnum(Object.values(METRIC_OPTIONS)))
  .withDefault([METRIC_OPTIONS.Actuals])
  .withOptions({
    shallow: false,
    history: 'replace',
    limitUrlUpdates: {
      method: 'debounce',
      timeMs: 100,
    },
  })

export const btGranularityParser = parseAsStringEnum(Object.values(GRANULARITY_OPTIONS))
  .withDefault(GRANULARITY_OPTIONS.Monthly)
  .withOptions({
    shallow: false,
    history: 'replace',
    limitUrlUpdates: {
      method: 'debounce',
      timeMs: 100,
    },
  })

export const breakdownTableFiltersConfig = {
  bt_metrics: btMetricsParser,
  bt_granularity: btGranularityParser,
} as const

export const breakdownTableSearchParamsCache = createSearchParamsCache({
  bt_metrics: btMetricsParser,
  bt_granularity: btGranularityParser,
})
