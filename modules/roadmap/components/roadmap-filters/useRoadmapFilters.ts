import { parseAsArrayOf, parseAsString, parseAsStringEnum, useQueryState } from 'nuqs'
import { useCallback } from 'react'
import { ScopeOfWork_DeliverableSetStatus } from '@/modules/__generated__/graphql/switchboard-generated'

export default function useWorkstreamFilters() {
  const [search, setSearch] = useQueryState('search', parseAsString.withDefault(''))
  const [statuses, setStatuses] = useQueryState(
    'statuses',
    parseAsArrayOf(parseAsStringEnum(Object.values(ScopeOfWork_DeliverableSetStatus))).withDefault(
      [],
    ),
  )

  const onReset = useCallback(() => {
    void setSearch('')
    void setStatuses([])
  }, [setSearch, setStatuses])

  return { search, statuses, setSearch, setStatuses, onReset }
}
