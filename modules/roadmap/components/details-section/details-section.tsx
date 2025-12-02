import { MilestoneDetailsCard, MilestoneDetailsCardSkeleton } from '../milestone-details-card'
import { SectionTitle } from '../section-title'
import type {
  RoadmapDetails,
  RoadmapDetails_Contributor,
  RoadmapDetails_Deliverable,
  RoadmapDetails_Project,
} from '../../types'

interface DetailsSectionProps {
  roadmap: RoadmapDetails | undefined
  deliverables: RoadmapDetails_Deliverable[]
  contributors: RoadmapDetails_Contributor[]
  projects: RoadmapDetails_Project[]
}

function DetailsSection({ deliverables, contributors, projects, roadmap }: DetailsSectionProps) {
  return (
    <div className="flex flex-col gap-6">
      <SectionTitle title="Milestones Roadmap Details" />

      <div className="flex flex-col gap-8">
        {roadmap?.milestones.map((milestone) => (
          <MilestoneDetailsCard
            key={milestone.id}
            milestone={milestone}
            deliverables={deliverables.filter((deliverable) =>
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
