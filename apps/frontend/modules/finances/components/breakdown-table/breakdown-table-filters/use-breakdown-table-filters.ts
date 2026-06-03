import { useQueryStates } from 'nuqs'
import { useCallback, useMemo } from 'react'
import { breakdownTableFiltersConfig } from '@/modules/finances/lib/breakdown-table-search-params'
import { GRANULARITY_OPTIONS, METRIC_OPTIONS } from '@/modules/finances/types'

function useBreakdownTableFilters() {
  const [filters, setFilters] = useQueryStates(breakdownTableFiltersConfig)

  const metrics = filters.bt_metrics
  const granularity = filters.bt_granularity

  const setMetrics = useCallback(
    (value: METRIC_OPTIONS[] | ((prev: METRIC_OPTIONS[]) => METRIC_OPTIONS[])) => {
      void setFilters((prev) => ({
        ...prev,
        bt_metrics: typeof value === 'function' ? value(prev.bt_metrics) : value,
      }))
    },
    [setFilters],
  )

  const setGranularity = useCallback(
    (value: GRANULARITY_OPTIONS) => {
      void setFilters({ bt_granularity: value })
    },
    [setFilters],
  )

  const onReset = useCallback(() => {
    void setFilters({
      bt_metrics: [METRIC_OPTIONS.Actuals],
      bt_granularity: GRANULARITY_OPTIONS.Monthly,
    })
  }, [setFilters])

  const isResetDisabled = useMemo(
    () =>
      metrics.length === 1 &&
      metrics[0] === METRIC_OPTIONS.Actuals &&
      granularity === GRANULARITY_OPTIONS.Monthly,
    [metrics, granularity],
  )

  return {
    metrics,
    granularity,
    setMetrics,
    setGranularity,
    onReset,
    isResetDisabled,
  }
}

export { useBreakdownTableFilters }
