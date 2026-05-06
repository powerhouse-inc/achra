import { parseAsArrayOf, parseAsString, parseAsStringEnum, useQueryStates } from 'nuqs'
import { useCallback, useMemo, useTransition } from 'react'
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
  skills: parseAsArrayOf(parseAsStringEnum(Object.values(BuilderSkill)))
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

function useBuildersFilters() {
  // Keep all filter params in a single query-state object so resetting or updating one key
  // happens in a single URL mutation, eliminating the flicker we saw with multiple setters.
  const [filters, setFilters] = useQueryStates(filtersConfig)
  const [isSearchPending, startSearchTransition] = useTransition()
  const [isSkillsPending, startSkillsTransition] = useTransition()
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
  const setSkills = useCallback(
    (value: StateUpdater<FiltersState['skills']>, options?: FilterOptions) => {
      startSkillsTransition(async () => {
        await setFilterValue('skills', value, options)
      })
    },
    [setFilterValue, startSkillsTransition],
  )
  const onReset = useCallback(() => {
    startResetTransition(async () => {
      await setFilters({
        search: '',
        skills: [],
      })
    })
  }, [setFilters, startResetTransition])

  const isResetDisabled = useMemo(
    () =>
      isSearchPending ||
      isSkillsPending ||
      isResetPending ||
      (filters.search === '' && filters.skills.length === 0),
    [isSearchPending, isSkillsPending, isResetPending, filters.search, filters.skills],
  )

  return {
    search: filters.search,
    skills: filters.skills,
    isSearchPending,
    isSkillsPending,
    isResetPending,
    isResetDisabled,
    setSearch,
    setSkills,
    onReset,
  }
}

export { useBuildersFilters }
