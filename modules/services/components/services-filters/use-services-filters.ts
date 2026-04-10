import { parseAsString, parseAsStringLiteral, useQueryStates } from 'nuqs'
import { useCallback, useMemo, useTransition } from 'react'
import type { ServiceTab } from '@/modules/services/types'

const SERVICE_TABS = ['all', 'builders', 'networks'] as const

const filtersConfig = {
  search: parseAsString.withDefault('').withOptions({
    shallow: false,
    history: 'replace',
    limitUrlUpdates: {
      method: 'debounce',
      timeMs: 300,
    },
  }),
  tab: parseAsStringLiteral(SERVICE_TABS).withDefault('all').withOptions({
    shallow: false,
    history: 'replace',
  }),
} as const

function useServicesFilters() {
  const [filters, setFilters] = useQueryStates(filtersConfig)
  const [isSearchPending, startSearchTransition] = useTransition()
  const [isTabPending, startTabTransition] = useTransition()
  const [isResetPending, startResetTransition] = useTransition()

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

  const setSearch = useCallback(
    (value: StateUpdater<FiltersState['search']>, options?: FilterOptions) => {
      startSearchTransition(async () => {
        await setFilterValue('search', value, options)
      })
    },
    [setFilterValue, startSearchTransition],
  )

  const setTab = useCallback(
    (value: ServiceTab, options?: FilterOptions) => {
      startTabTransition(async () => {
        await setFilterValue('tab', value, options)
      })
    },
    [setFilterValue, startTabTransition],
  )

  const onReset = useCallback(() => {
    startResetTransition(async () => {
      await setFilters({
        search: '',
        tab: 'all',
      })
    })
  }, [setFilters, startResetTransition])

  const isResetDisabled = useMemo(
    () =>
      isSearchPending ||
      isTabPending ||
      isResetPending ||
      (filters.search === '' && filters.tab === 'all'),
    [isSearchPending, isTabPending, isResetPending, filters.search, filters.tab],
  )

  return {
    search: filters.search,
    tab: filters.tab,
    isSearchPending,
    isTabPending,
    isResetPending,
    isResetDisabled,
    setSearch,
    setTab,
    onReset,
  }
}

export { useServicesFilters }
