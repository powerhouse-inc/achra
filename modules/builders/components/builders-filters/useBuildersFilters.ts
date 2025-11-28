import { parseAsArrayOf, parseAsString, parseAsStringEnum, useQueryStates } from 'nuqs'
import { useCallback } from 'react'
import { TeamScopeEnum } from '@/modules/shared/enums/actorScopeEnum'
import { TeamRole } from '@/modules/shared/types'

const filtersConfig = {
  search: parseAsString.withDefault('').withOptions({
    shallow: false,
    history: 'replace',
    limitUrlUpdates: {
      method: 'debounce',
      timeMs: 300,
    },
  }),
  scopes: parseAsArrayOf(parseAsStringEnum(Object.values(TeamScopeEnum)))
    .withDefault([])
    .withOptions({
      shallow: false,
      history: 'replace',
      limitUrlUpdates: {
        method: 'debounce',
        timeMs: 100,
      },
    }),
  actorRoles: parseAsArrayOf(parseAsStringEnum(Object.values(TeamRole)))
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
  const setActorRoles = useCallback(
    async (value: StateUpdater<FiltersState['actorRoles']>, options?: FilterOptions) =>
      setFilterValue('actorRoles', value, options),
    [setFilterValue],
  )
  const onReset = useCallback(() => {
    void setFilters({
      search: '',
      scopes: [],
      actorRoles: [],
    })
  }, [setFilters])

  return {
    search: filters.search,
    scopes: filters.scopes,
    actorRoles: filters.actorRoles,
    setSearch,
    setScopes,
    setActorRoles,
    onReset,
  }
}
