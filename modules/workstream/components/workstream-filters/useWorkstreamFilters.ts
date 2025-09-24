import { parseAsString, parseAsStringEnum, useQueryState } from 'nuqs'
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
  const [network, setNetwork] = useQueryState('network', parseAsString.withDefault('all'))

  const onReset = useCallback(() => {
    void setSearch('')
    void setStatus(WorkstreamStatus.OpenForProposals)
    void setNetwork('all')
  }, [setSearch, setStatus, setNetwork])

  return { search, status, network, setSearch, setStatus, setNetwork, onReset }
}
