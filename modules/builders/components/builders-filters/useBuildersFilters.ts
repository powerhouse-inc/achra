import { parseAsArrayOf, parseAsString, parseAsStringEnum, useQueryStates } from 'nuqs'
import { useCallback } from 'react'
import { BuilderScope, BuilderSkill } from '@/modules/__generated__/graphql/switchboard-generated'

const filtersConfig = {
  search: parseAsString.withDefault('').withOptions({
    shallow: false,
    history: 'replace',
    limitUrlUpdates: {
      method: 'debounce',
      timeMs: 300,
    },
  }),
  scopes: parseAsArrayOf(parseAsStringEnum(Object.values(BuilderScope)))
    .withDefault([])
    .withOptions({
      shallow: false,
      history: 'replace',
      limitUrlUpdates: {
        method: 'debounce',
        timeMs: 100,
      },
    }),
  actorSkills: parseAsArrayOf(parseAsStringEnum(Object.values(BuilderSkill)))
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

export default function useBuilderFilters() {
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
  const setScopes = useCallback(
    async (value: StateUpdater<FiltersState['scopes']>, options?: FilterOptions) =>
      setFilterValue('scopes', value, options),
    [setFilterValue],
  )
  const setActorSkills = useCallback(
    async (value: StateUpdater<FiltersState['actorSkills']>, options?: FilterOptions) =>
      setFilterValue('actorSkills', value, options),
    [setFilterValue],
  )
  const onReset = useCallback(() => {
    void setFilters({
      search: '',
      scopes: [],
      actorSkills: [],
    })
  }, [setFilters])

  return {
    search: filters.search,
    scopes: filters.scopes,
    actorSkills: filters.actorSkills,
    setSearch,
    setScopes,
    setActorSkills,
    onReset,
  }
}
