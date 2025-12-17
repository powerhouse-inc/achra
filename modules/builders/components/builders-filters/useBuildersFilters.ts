import { parseAsArrayOf, parseAsString, parseAsStringEnum, useQueryStates } from 'nuqs'
import { useCallback } from 'react'
import { BuilderSkill } from '@/modules/__generated__/graphql/switchboard-generated'

const filtersConfig = {
  search: parseAsString.withDefault('').withOptions({
    shallow: false,
    history: 'replace',
    limitUrlUpdates: {
      method: 'debounce',
      timeMs: 300,
    },
  }),
  builderSkills: parseAsArrayOf(parseAsStringEnum(Object.values(BuilderSkill)))
    .withDefault([])
    .withOptions({
      shallow: false,
      history: 'replace',
      limitUrlUpdates: {
        method: 'debounce',
        timeMs: 100,
      },
    }),
} as const

export default function useBuildersFilters() {
  // Keep all filter params in a single query-state object so resetting or updating one key
  // happens in a single URL mutation, eliminating the flicker we saw with multiple setters.
  const [filters, setFilters] = useQueryStates(filtersConfig)

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
    async (value: StateUpdater<FiltersState['search']>, options?: FilterOptions) =>
      setFilterValue('search', value, options),
    [setFilterValue],
  )
  const setBuilderSkills = useCallback(
    async (value: StateUpdater<FiltersState['builderSkills']>, options?: FilterOptions) =>
      setFilterValue('builderSkills', value, options),
    [setFilterValue],
  )
  const onReset = useCallback(() => {
    void setFilters({
      search: '',
      builderSkills: [],
    })
  }, [setFilters])

  return {
    search: filters.search,
    builderSkills: filters.builderSkills,
    setSearch,
    setBuilderSkills,
    onReset,
  }
}
