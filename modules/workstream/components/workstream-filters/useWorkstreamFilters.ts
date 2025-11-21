import { parseAsArrayOf, parseAsString, parseAsStringEnum, useQueryState } from 'nuqs'
import { useCallback } from 'react'
import { WorkstreamStatus } from '@/modules/__generated__/graphql/switchboard-generated'

export default function useWorkstreamFilters() {
  const [search, setSearch] = useQueryState(
    'search',
    parseAsString.withDefault('').withOptions({
      shallow: false,
      history: 'replace',
      limitUrlUpdates: {
        method: 'debounce',
        timeMs: 300,
      },
    }),
  )
  const [statuses, setStatuses] = useQueryState(
    'statuses',
    parseAsArrayOf(parseAsStringEnum(Object.values(WorkstreamStatus)))
      .withDefault([])
      .withOptions({
        shallow: false,
        history: 'replace',
        limitUrlUpdates: {
          method: 'debounce',
          timeMs: 100,
        },
      }),
  )
  const [networks, setNetworks] = useQueryState(
    'networks',
    parseAsArrayOf(parseAsString)
      .withDefault([])
      .withOptions({
        shallow: false,
        history: 'replace',
        limitUrlUpdates: {
          method: 'debounce',
          timeMs: 100,
        },
      }),
  )

  const onReset = useCallback(() => {
    void setSearch('')
    void setStatuses([])
    void setNetworks([])
  }, [setSearch, setStatuses, setNetworks])

  return {
    search,
    statuses,
    networks,
    setSearch,
    setStatuses,
    setNetworks,
    onReset,
  }
}
