import { encodeSectionId, SectionActivation } from '@/modules/shared/components/section-activation'
import { DetailsSection, DetailsSectionSkeleton } from '../details-section'
import { OverviewSection, OverviewSectionSkeleton } from '../overview-section'
import type {
  RoadmapDetails,
  RoadmapDetails_Contributor,
  RoadmapDetails_Deliverable,
  RoadmapDetails_Project,
} from '../../types'

interface RoadmapDetailsContentProps {
  roadmap: RoadmapDetails
  deliverables: RoadmapDetails_Deliverable[]
  contributors: RoadmapDetails_Contributor[]
  projects: RoadmapDetails_Project[]
}

function RoadmapDetailsContent({
  roadmap,
  deliverables,
  contributors,
  projects,
}: RoadmapDetailsContentProps) {
  const sections = roadmap.milestones.map((milestone) => milestone.sequenceCode)
  const encodedSections = sections.map((section) => encodeSectionId(section))

  return (
    <ContentContainer>
      <OverviewSection roadmap={roadmap} />
      <DetailsSection
        roadmap={roadmap}
        deliverables={deliverables}
        contributors={contributors}
        projects={projects}
      />
      <SectionActivation sections={encodedSections} />
    </ContentContainer>
  )
}

function RoadmapDetailsContentSkeleton() {
  return (
    <ContentContainer>
      <OverviewSectionSkeleton />
      <DetailsSectionSkeleton />
    </ContentContainer>
  )
}

function ContentContainer({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-10">{children}</div>
}

export { RoadmapDetailsContent, RoadmapDetailsContentSkeleton }
