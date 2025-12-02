import { SectionTitle } from '../section-title'
import { Timeline, TimelineSkeleton } from '../timeline'
import type { RoadmapDetails } from '../../types'

interface OverviewSectionProps {
  roadmap: RoadmapDetails | undefined
}

function OverviewSection({ roadmap }: OverviewSectionProps) {
  return (
    <div className="flex flex-col gap-6">
      <SectionTitle
        title="Milestones Roadmap Overview"
        tooltip="Milestones represent checkpoints on the way to full completion of the roadmap,
      where a well-defined subset of the deliverables is deployed as an intermediate, integrated solution."
      />
      <Timeline milestones={roadmap?.milestones ?? []} />
    </div>
  )
}

function OverviewSectionSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <SectionTitle title="Milestones Roadmap Overview" />
      <TimelineSkeleton />
    </div>
  )
}

export { OverviewSection, OverviewSectionSkeleton }
