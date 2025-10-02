import { parseAsArrayOf, parseAsString, parseAsStringEnum, useQueryState } from 'nuqs'
import { useCallback } from 'react'
import { WorkstreamStatus } from '@/modules/__generated__/graphql/switchboard-generated'

export default function useWorkstreamFilters() {
  const [search, setSearch] = useQueryState('search', parseAsString.withDefault(''))
  const [status, setStatus] = useQueryState(
    'status',
    parseAsStringEnum(Object.values(WorkstreamStatus)).withDefault(
      WorkstreamStatus.OpenForProposals,
    ),
  )
  const [networks, setNetworks] = useQueryState(
    'networks',
    parseAsArrayOf(parseAsString).withDefault([]),
  )

  const onReset = useCallback(() => {
    void setSearch('')
    void setStatus(WorkstreamStatus.OpenForProposals)
    void setNetworks([])
  }, [setSearch, setStatus, setNetworks])

  return { search, status, networks, setSearch, setStatus, setNetworks, onReset }
}
