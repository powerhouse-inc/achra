import {
  type ScopeOfWork_Roadmap,
  ScopeOfWorkDocument,
  type ScopeOfWorkQuery,
} from '@/modules/__generated__/graphql/switchboard-generated'
import { switchboardFetcher } from '@/shared/lib/fetcher'
import { SCOPE_OF_WORK_DOCUMENT_ID } from './constants'

export async function fetchPowerhouseScopeOfWork(): Promise<ScopeOfWorkQuery> {
  return switchboardFetcher(ScopeOfWorkDocument, {
    docId: SCOPE_OF_WORK_DOCUMENT_ID,
  })() as Promise<ScopeOfWorkQuery>
}

export function getRoadmapFromScopeOfWork(
  scopeOfWork: ScopeOfWorkQuery,
  roadmapSlug: string,
): ScopeOfWork_Roadmap | undefined {
  // TODO: use the state instead of the stateJSON once the progress is fixed in the api
  // This is a temporary workaround to use the progress information
  return scopeOfWork.ScopeOfWork?.getDocument?.stateJSON?.roadmaps?.find(
    (roadmap: ScopeOfWork_Roadmap) => roadmap.slug === roadmapSlug,
  ) as ScopeOfWork_Roadmap | undefined
}
