import { type ScopeOfWorkQuery } from '@/modules/__generated__/graphql/switchboard-generated'

export function fetchPowerhouseScopeOfWorkMock() {
  return {
    ScopeOfWork: {
      getDocument: {
        stateJSON: {
          roadmaps: [],
        },
      },
    },
  } as ScopeOfWorkQuery
}
