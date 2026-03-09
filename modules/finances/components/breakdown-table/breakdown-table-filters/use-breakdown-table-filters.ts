import { useQueryStates } from 'nuqs'
import { useCallback, useMemo, useTransition } from 'react'

import { breakdownTableFiltersConfig } from '@/modules/finances/lib/breakdown-table-search-params'
import { GRANULARITY_OPTIONS, METRIC_OPTIONS } from '@/modules/finances/types'

type MetricOption = (typeof METRIC_OPTIONS)[keyof typeof METRIC_OPTIONS]
type GranularityOption = (typeof GRANULARITY_OPTIONS)[keyof typeof GRANULARITY_OPTIONS]

function useBreakdownTableFilters() {
  const [filters, setFilters] = useQueryStates(breakdownTableFiltersConfig)

  const [isMetricsPending, startMetricsTransition] = useTransition()
  const [isGranularityPending, startGranularityTransition] = useTransition()
  const [isResetPending, startResetTransition] = useTransition()

  const metrics = filters.bt_metrics
  const granularity = filters.bt_granularity

  const setMetrics = useCallback(
    (value: MetricOption[] | ((prev: MetricOption[]) => MetricOption[])) => {
      startMetricsTransition(async () => {
        await setFilters((prev) => ({
          ...prev,
          bt_metrics: typeof value === 'function' ? value(prev.bt_metrics) : value,
        }))
      })
    },
    [setFilters, startMetricsTransition],
  )

  const setGranularity = useCallback(
    (value: GranularityOption) => {
      startGranularityTransition(async () => {
        await setFilters({ bt_granularity: value })
      })
    },
    [setFilters, startGranularityTransition],
  )

  const onReset = useCallback(() => {
    startResetTransition(async () => {
      await setFilters({
        bt_metrics: [METRIC_OPTIONS.Actuals],
        bt_granularity: GRANULARITY_OPTIONS.Monthly,
      })
    })
  }, [setFilters, startResetTransition])

  const isResetDisabled = useMemo(
    () =>
      isMetricsPending ||
      isGranularityPending ||
      isResetPending ||
      (metrics.length === 1 &&
        metrics[0] === METRIC_OPTIONS.Actuals &&
        granularity === GRANULARITY_OPTIONS.Monthly),
    [isMetricsPending, isGranularityPending, isResetPending, metrics, granularity],
  )

  return {
    metrics,
    granularity,
    setMetrics,
    setGranularity,
    onReset,
    isResetDisabled,
    isResetPending,
    isMetricsPending,
    isGranularityPending,
  }
}

export { useBreakdownTableFilters }
