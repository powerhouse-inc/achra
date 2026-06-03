import { parseAsString, useQueryStates } from 'nuqs'
import { useCallback, useMemo, useTransition } from 'react'

const filtersConfig = {
  search: parseAsString.withDefault('').withOptions({
    shallow: false,
    history: 'replace',
    limitUrlUpdates: {
      method: 'debounce',
      timeMs: 300,
    },
  }),
} as const

function useServicesFilters() {
  const [filters, setFilters] = useQueryStates(filtersConfig)
  const [isSearchPending, startSearchTransition] = useTransition()
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

  const onReset = useCallback(() => {
    startResetTransition(async () => {
      await setFilters({
        search: '',
      })
    })
  }, [setFilters, startResetTransition])

  const isResetDisabled = useMemo(
    () => isSearchPending || isResetPending || filters.search === '',
    [isSearchPending, isResetPending, filters.search],
  )

  return {
    search: filters.search,
    isSearchPending,
    isResetPending,
    isResetDisabled,
    setSearch,
    onReset,
  }
}

export { useServicesFilters }
