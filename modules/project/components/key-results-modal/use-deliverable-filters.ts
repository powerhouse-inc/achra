import { parseAsArrayOf, parseAsString, parseAsStringEnum, useQueryState } from 'nuqs'
import { useCallback, useMemo } from 'react'
import {
  type ScopeOfWork_Deliverable,
  ScopeOfWork_DeliverableStatus,
} from '@/modules/__generated__/graphql/switchboard-generated'

interface UseDeliverableFiltersProps {
  deliverables: ScopeOfWork_Deliverable[]
}

function useDeliverableFilters({ deliverables = [] }: UseDeliverableFiltersProps) {
  const [search, setSearch] = useQueryState('search', parseAsString.withDefault(''))
  const [statuses, setStatuses] = useQueryState<ScopeOfWork_DeliverableStatus[]>(
    'statuses',
    parseAsArrayOf(parseAsStringEnum(Object.values(ScopeOfWork_DeliverableStatus))).withDefault([]),
  )

  const filteredDeliverables = useMemo(() => {
    return deliverables
      .filter((deliverable) => {
        // Filter by deliverable status
        const statusMatch = statuses.length === 0 || statuses.includes(deliverable.status)
        return statusMatch
      })
      .map((deliverable) => {
        const filteredKeyResults = deliverable.keyResults.filter((keyResult) => {
          // Filter by search query (name or URL)
          const searchMatch =
            search === '' ||
            keyResult.title.toLowerCase().includes(search.toLowerCase()) ||
            keyResult.link.toLowerCase().includes(search.toLowerCase())

          return searchMatch
        })

        return {
          ...deliverable,
          keyResults: filteredKeyResults,
        }
      })
      .filter((deliverable) => deliverable.keyResults.length > 0)
  }, [deliverables, search, statuses])

  const onReset = useCallback(() => {
    void setSearch('')
    void setStatuses([])
  }, [setSearch, setStatuses])

  return {
    search,
    statuses,
    setSearch,
    setStatuses,
    onReset,
    filteredDeliverables,
  }
}

export { useDeliverableFilters }
