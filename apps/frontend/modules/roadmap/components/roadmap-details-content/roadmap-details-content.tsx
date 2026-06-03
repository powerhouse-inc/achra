import type {
  Sow_Agent,
  Sow_Deliverable,
  Sow_Project,
  Sow_Roadmap,
} from '@/modules/__generated__/graphql/switchboard-generated'
import { encodeSectionId, SectionActivation } from '@/modules/shared/components/section-activation'
import { DetailsSection, DetailsSectionSkeleton } from '../details-section'
import { OverviewSection, OverviewSectionSkeleton } from '../overview-section'

function ContentContainer({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-10">{children}</div>
}

interface RoadmapDetailsContentProps {
  roadmap: Sow_Roadmap
  deliverables: Sow_Deliverable[]
  contributors: Sow_Agent[]
  projects: Sow_Project[]
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

export { RoadmapDetailsContent, RoadmapDetailsContentSkeleton }
