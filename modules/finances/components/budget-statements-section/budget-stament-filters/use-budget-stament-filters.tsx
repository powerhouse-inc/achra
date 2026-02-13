import { parseAsArrayOf, parseAsStringEnum, parseAsStringLiteral, useQueryStates } from 'nuqs'
import { useCallback, useMemo, useTransition } from 'react'

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
    .withDefault('reporting_newest')
    .withOptions({
      shallow: false,
      history: 'replace',
    }),
} as const

export default function useBudgetStamentFilters() {
  const [filters, setFilters] = useQueryStates(filtersConfig)

  const [isStatusPending, startStatusTransition] = useTransition()
  const [isMetricPending, startMetricTransition] = useTransition()
  const [isResetPending, startResetTransition] = useTransition()

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
    (value: StateUpdater<FiltersState['status']>, options?: FilterOptions) => {
      startStatusTransition(async () => {
        await setFilterValue('status', value, options)
      })
    },
    [setFilterValue, startStatusTransition],
  )

  const setMetric = useCallback(
    (value: StateUpdater<FiltersState['metricbs']>, options?: FilterOptions) => {
      startMetricTransition(async () => {
        await setFilterValue('metricbs', value, options)
      })
    },
    [setFilterValue, startMetricTransition],
  )

  const onReset = useCallback(() => {
    startResetTransition(async () => {
      await setFilters({
        status: [],
        metricbs: METRIC_OPTIONS.Actuals,
      })
    })
  }, [setFilters, startResetTransition])

  const isResetDisabled = useMemo(
    () =>
      isStatusPending ||
      isMetricPending ||
      isResetPending ||
      (filters.status.length === 0 && filters.metricbs === METRIC_OPTIONS.Actuals),
    [isStatusPending, isMetricPending, isResetPending, filters.status, filters.metricbs],
  )

  return {
    status: filters.status,
    metric: filters.metricbs,
    isStatusPending,
    isMetricPending,
    isResetPending,
    isResetDisabled,
    setStatus,
    onReset,
    metricSort,
    setMetricSort,
    setMetric,
    handleOnMetricSelect,
  }
}
