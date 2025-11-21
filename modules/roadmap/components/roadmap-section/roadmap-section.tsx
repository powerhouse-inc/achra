import type {
  ClientInfo,
  Maybe,
  ScopeOfWork_Milestone,
  Sow_Roadmap,
} from '@/modules/__generated__/graphql/switchboard-generated'
import { slugify } from '@/modules/shared/lib/slug'
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
  client?: Maybe<ClientInfo>
  workstreamSlug: string
  workstreamTitle: string
}
export function RoadmapSection({
  roadmap,
  client,
  workstreamSlug,
  workstreamTitle,
}: RoadmapSectionProps) {
  // TODO: replace with the actual network slug once available in the API
  const networkSlug = slugify(client?.name ?? '')

  return (
    <div className="flex flex-col gap-6">
      <Header
        client={client}
        workstreamSlug={workstreamSlug}
        title={roadmap.title}
        description={roadmap.description}
        networkSlug={networkSlug}
        roadmapSlug={roadmap.slug}
        workstreamTitle={workstreamTitle}
      />
      <div className="relative z-10 flex flex-col gap-6 sm:hidden">
        <div className="bg-border absolute top-0 left-1/2 -z-10 h-full w-1 -translate-x-1/2" />
        {roadmap.milestones.map((milestone) => (
          <MilestoneExtendedCard
            key={milestone.id}
            milestone={milestone as ScopeOfWork_Milestone}
            networkSlug={networkSlug}
            roadmapSlug={roadmap.slug}
          />
        ))}
      </div>
      <RoadmapSwiper
        milestones={roadmap.milestones as ScopeOfWork_Milestone[]}
        networkSlug={networkSlug}
        roadmapSlug={roadmap.slug}
      />
    </div>
  )
}
