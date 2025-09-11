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
  return scopeOfWork.ScopeOfWork?.getDocument?.state.roadmaps.find(
    (roadmap) => roadmap.slug === roadmapSlug,
  ) as ScopeOfWork_Roadmap | undefined
}
