import { parseAsArrayOf, parseAsString, parseAsStringEnum, useQueryState } from 'nuqs'
import { useCallback } from 'react'
import { WorkstreamStatus } from '@/modules/__generated__/graphql/switchboard-generated'

export default function useWorkstreamFilters() {
  const [search, setSearch] = useQueryState('search', parseAsString.withDefault(''))
  const [statuses, setStatuses] = useQueryState(
    'statuses',
    parseAsArrayOf(parseAsStringEnum(Object.values(WorkstreamStatus))).withDefault([]),
  )
  const [networks, setNetworks] = useQueryState(
    'networks',
    parseAsArrayOf(parseAsString).withDefault([]),
  )

  const onReset = useCallback(() => {
    void setSearch('')
    void setStatuses([WorkstreamStatus.OpenForProposals])
    void setNetworks([])
  }, [setSearch, setStatuses, setNetworks])

  return { search, statuses, networks, setSearch, setStatuses, setNetworks, onReset }
}
