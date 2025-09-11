'use client'

import { useParams } from 'next/navigation'
import {
  type ScopeOfWork_Deliverable,
  type ScopeOfWork_Project,
  useScopeOfWorkQuery,
} from '@/modules/__generated__/graphql/switchboard-generated'
import { FAST_REFRESH_INTERVAL } from '@/modules/shared/config/constants'
import { SCOPE_OF_WORK_DOCUMENT_ID } from '../../lib/constants'
import { getRoadmapFromScopeOfWork } from '../../lib/fetch-scope-of-work'
import { MilestoneDetailsCard } from '../milestone-details-card'
import { SectionTitle } from '../section-title'

export default function DetailsSection() {
  const { roadmapSlug } = useParams()
  const { data } = useScopeOfWorkQuery(
    {
      docId: SCOPE_OF_WORK_DOCUMENT_ID,
    },
    {
      enabled: !!roadmapSlug,
      refetchInterval: FAST_REFRESH_INTERVAL,
    },
  )
  const roadmap = data && getRoadmapFromScopeOfWork(data, roadmapSlug as string)

  return (
    <div className="flex flex-col gap-6">
      <SectionTitle title="Milestones Roadmap Details" />

      <div className="flex flex-col gap-8">
        {roadmap?.milestones?.map((milestone) => (
          <MilestoneDetailsCard
            key={milestone.id}
            milestone={milestone}
            deliverables={(data?.ScopeOfWork?.getDocument?.stateJSON?.deliverables ?? []).filter(
              (deliverable: ScopeOfWork_Deliverable) =>
                milestone.scope?.deliverables.some(
                  (deliverableId) => deliverableId === deliverable.id,
                ),
            )}
            contributors={data?.ScopeOfWork?.getDocument?.state.contributors ?? []}
            projects={
              (data?.ScopeOfWork?.getDocument?.state.projects ?? []) as ScopeOfWork_Project[]
            }
          />
        ))}
      </div>
    </div>
  )
}
