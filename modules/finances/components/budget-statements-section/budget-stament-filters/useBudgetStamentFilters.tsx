import { parseAsArrayOf, parseAsStringEnum, parseAsStringLiteral, useQueryStates } from 'nuqs'
import { useCallback } from 'react'

import { ExpenseReport_ExpenseReportStatus } from '@/modules/__generated__/graphql/switchboard-generated'
import { METRIC_OPTIONS } from '@/modules/finances/types'
import type { SortOptionValue } from './popover-filter-content'

const filtersConfig = {
  status: parseAsArrayOf(parseAsStringEnum(Object.values(ExpenseReport_ExpenseReportStatus)))
    .withDefault([])
    .withOptions({
      shallow: false,
      history: 'replace',
      limitUrlUpdates: {
        method: 'debounce',
        timeMs: 100,
      },
    }),
  metricbs: parseAsStringEnum(Object.values(METRIC_OPTIONS).filter((metric) => metric !== 'Budget'))
    .withDefault(METRIC_OPTIONS.Actuals)
    .withOptions({
      shallow: false,
      history: 'replace',
      limitUrlUpdates: {
        method: 'debounce',
        timeMs: 100,
      },
    }),
  sort: parseAsStringLiteral([
    'reporting_newest',
    'reporting_oldest',
    'modified_newest',
    'modified_oldest',
  ] as const)
    .withDefault('modified_newest')
    .withOptions({
      shallow: false,
      history: 'replace',
    }),
} as const

export default function useBudgetStamentFilters() {
  const [filters, setFilters] = useQueryStates(filtersConfig)
  const { sort: metricSort } = filters
  const setMetricSort = useCallback(
    async (value: SortOptionValue | null) => setFilters({ sort: value }),
    [setFilters],
  )
  const handleOnMetricSelect = useCallback(
    (value: SortOptionValue) => {
      void setMetricSort(value)
    },
    [setMetricSort],
  )

  type FiltersState = typeof filters
  type FilterKey = keyof FiltersState
  type FilterOptions = Parameters<typeof setFilters>[1]
  type StateUpdater<Value> = Value | null | ((previous: Value) => Value | null)

  const setFilterValue = useCallback(
    async <Key extends FilterKey>(
      key: Key,
      value: StateUpdater<FiltersState[Key]>,
      options?: FilterOptions,
    ) => {
      return setFilters(
        (previous) => ({
          [key]: typeof value === 'function' ? value(previous[key]) : value,
        }),
        options,
      )
    },
    [setFilters],
  )

  const setStatus = useCallback(
    async (value: StateUpdater<FiltersState['status']>, options?: FilterOptions) =>
      setFilterValue('status', value, options),
    [setFilterValue],
  )

  const setMetric = useCallback(
    async (value: StateUpdater<FiltersState['metricbs']>, options?: FilterOptions) =>
      setFilterValue('metricbs', value, options),
    [setFilterValue],
  )

  const onReset = useCallback(() => {
    void setFilters({
      status: [],
      metricbs: METRIC_OPTIONS.Actuals,
    })
    void setStatus(null)
    void setMetricSort('modified_newest')
  }, [setFilters, setStatus, setMetricSort])

  return {
    status: filters.status,
    metric: filters.metricbs,
    setStatus,
    onReset,
    metricSort,
    setMetricSort,
    setMetric,
    handleOnMetricSelect,
  }
}
