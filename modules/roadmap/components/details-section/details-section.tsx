import type {
  Sow_Agent,
  Sow_Deliverable,
  Sow_Project,
  Sow_Roadmap,
} from '@/modules/__generated__/graphql/switchboard-generated'
import { MilestoneDetailsCard, MilestoneDetailsCardSkeleton } from '../milestone-details-card'
import { SectionTitle } from '../section-title'

interface DetailsSectionProps {
  roadmap: Sow_Roadmap | undefined
  deliverables: Sow_Deliverable[]
  contributors: Sow_Agent[]
  projects: Sow_Project[]
}

function DetailsSection({ roadmap, deliverables, contributors, projects }: DetailsSectionProps) {
  return (
    <div className="flex flex-col gap-6">
      <SectionTitle title="Milestones Roadmap Details" />

      <div className="flex flex-col gap-8">
        {roadmap?.milestones.map((milestone) => (
          <MilestoneDetailsCard
            key={milestone.id}
            milestone={milestone}
            deliverables={deliverables.filter((deliverable: Sow_Deliverable) =>
              milestone.scope?.deliverables.some(
                (deliverableId) => deliverableId === deliverable.id,
              ),
            )}
            contributors={contributors}
            projects={projects}
          />
        ))}
      </div>
    </div>
  )
}

function DetailsSectionSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <SectionTitle title="Milestones Roadmap Details" />

      <MilestoneDetailsCardSkeleton />
    </div>
  )
}

export { DetailsSection, DetailsSectionSkeleton }
