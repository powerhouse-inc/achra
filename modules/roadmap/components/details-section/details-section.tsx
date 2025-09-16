import {
  type ScopeOfWork_Deliverable,
  type ScopeOfWork_Project,
  type ScopeOfWork_Roadmap,
  type ScopeOfWorkQuery,
} from '@/modules/__generated__/graphql/switchboard-generated'
import { MilestoneDetailsCard } from '../milestone-details-card'
import { SectionTitle } from '../section-title'

interface DetailsSectionProps {
  scopeOfWorkQuery: ScopeOfWorkQuery | undefined
  roadmap: ScopeOfWork_Roadmap | undefined
}

export default function DetailsSection({ scopeOfWorkQuery, roadmap }: DetailsSectionProps) {
  return (
    <div className="flex flex-col gap-6">
      <SectionTitle title="Milestones Roadmap Details" />

      <div className="flex flex-col gap-8">
        {roadmap?.milestones?.map((milestone) => (
          <MilestoneDetailsCard
            key={milestone.id}
            milestone={milestone}
            deliverables={(
              scopeOfWorkQuery?.ScopeOfWork?.getDocument?.stateJSON?.deliverables ?? []
            ).filter((deliverable: ScopeOfWork_Deliverable) =>
              milestone.scope?.deliverables.some(
                (deliverableId) => deliverableId === deliverable.id,
              ),
            )}
            contributors={scopeOfWorkQuery?.ScopeOfWork?.getDocument?.state.contributors ?? []}
            projects={
              (scopeOfWorkQuery?.ScopeOfWork?.getDocument?.state.projects ??
                []) as ScopeOfWork_Project[]
            }
          />
        ))}
      </div>
    </div>
  )
}
