import { parseAsArrayOf, parseAsString, parseAsStringEnum, useQueryState } from 'nuqs'
import { useCallback } from 'react'
import { TeamScopeEnum } from '@/modules/shared/enums/actorScopeEnum'
import { TeamRole } from '@/modules/shared/types'

export default function useBuilderFilters() {
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
  const [scopes, setScopes] = useQueryState(
    'scopes',
    parseAsArrayOf(parseAsStringEnum(Object.values(TeamScopeEnum)))
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
  const [actorRoles, setActorRoles] = useQueryState(
    'actorRoles',
    parseAsArrayOf(parseAsStringEnum(Object.values(TeamRole)))
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
    void setScopes([])
    void setActorRoles([])
  }, [setSearch, setScopes, setActorRoles])

  return { search, scopes, actorRoles, setSearch, setScopes, setActorRoles, onReset }
}
