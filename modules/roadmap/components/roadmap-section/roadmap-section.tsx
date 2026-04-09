import type {
  Network,
  ScopeOfWork_Milestone,
  Sow_Deliverable,
  Sow_Roadmap,
} from '@/modules/__generated__/graphql/switchboard-generated'
import { cn } from '@/modules/shared/lib/utils'
import { MilestoneExtendedCard } from '../milestone-extended-card'
import { RoadmapSwiper } from '../roadmap-swiper'
import { Header } from './components/header'

// Note: there are two types of roadmaps
// 1. Sow_Roadmap
// 2. ScopeOfWork_Roadmap
// Note: Both types are exactly the same.
// TODO: Ask the client to reuse the already existing type for roadmaps so we do not need to instantiate the data to the original type
interface RoadmapSectionProps {
  roadmap: Sow_Roadmap
  network?: Pick<Network, 'name' | 'logo' | 'darkThemeLogo' | 'slug'>
  workstreamSlug: string
  workstreamTitle: string
  deliverables: Sow_Deliverable[]
  className?: string
}
export function RoadmapSection({
  roadmap,
  network,
  workstreamSlug,
  workstreamTitle,
  deliverables,
  className,
}: RoadmapSectionProps) {
  return (
    <div className={cn('flex flex-col gap-6', className)}>
      <Header
        network={network}
        workstreamSlug={workstreamSlug}
        title={roadmap.title}
        description={roadmap.description}
        networkSlug={network?.slug ?? ''}
        roadmapSlug={roadmap.slug}
        workstreamTitle={workstreamTitle}
      />
      <div className="relative z-10 flex flex-col gap-6 sm:hidden">
        <div className="bg-border absolute top-0 left-1/2 -z-10 h-full w-1 -translate-x-1/2" />
        {roadmap.milestones.map((milestone) => (
          <MilestoneExtendedCard
            key={milestone.id}
            milestone={milestone as ScopeOfWork_Milestone}
            networkSlug={network?.slug ?? ''}
            roadmapSlug={roadmap.slug}
            deliverables={deliverables}
          />
        ))}
      </div>
      <RoadmapSwiper
        milestones={roadmap.milestones as ScopeOfWork_Milestone[]}
        networkSlug={network?.slug ?? ''}
        roadmapSlug={roadmap.slug}
        deliverables={deliverables}
      />
    </div>
  )
}
