import { parseAsArrayOf, parseAsStringEnum, useQueryStates } from 'nuqs'
import { useCallback, useState } from 'react'
import { BuilderStatus } from '@/modules/__generated__/graphql/switchboard-generated'
import { METRIC_OPTIONS } from '@/modules/finances/types'
import type { SortOptionValue } from './popover-filter-content'

const filtersConfig = {
  status: parseAsArrayOf(parseAsStringEnum(Object.values(BuilderStatus)))
    .withDefault([])
    .withOptions({
      shallow: false,
      history: 'replace',
      limitUrlUpdates: {
        method: 'debounce',
        timeMs: 100,
      },
    }),
  budgetMetric: parseAsStringEnum(
    Object.values(METRIC_OPTIONS).filter((metric) => metric !== 'Budget'),
  )
    .withDefault(METRIC_OPTIONS.Actuals)
    .withOptions({
      shallow: false,
      history: 'replace',
      limitUrlUpdates: {
        method: 'debounce',
        timeMs: 100,
      },
    }),
} as const

export default function useBudgetStamentFilters() {
  const [open, setOpen] = useState(false)
  const [filters, setFilters] = useQueryStates(filtersConfig)
  const [metricSort, setMetricSort] = useState<SortOptionValue>('reporting_newest')
  const handleOnMetricSelect = useCallback(
    (value: SortOptionValue) => {
      setMetricSort(value)
      setOpen(false)
    },
    [setMetricSort, setOpen],
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
    async (value: StateUpdater<FiltersState['budgetMetric']>, options?: FilterOptions) =>
      setFilterValue('budgetMetric', value, options),
    [setFilterValue],
  )

  const onReset = useCallback(() => {
    void setFilters({
      status: [],
      budgetMetric: METRIC_OPTIONS.Actuals,
    })
    void setStatus(null)
  }, [setFilters, setStatus])

  return {
    status: filters.status,
    metric: filters.budgetMetric,
    setStatus,
    onReset,
    metricSort,
    setMetricSort,
    setMetric,
    open,
    setOpen,
    handleOnMetricSelect,
  }
}
