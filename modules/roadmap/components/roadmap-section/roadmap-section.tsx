import type { ScopeOfWork_Roadmap } from '@/modules/__generated__/graphql/switchboard-generated'
import { MilestoneExtendedCard } from '../milestone-extended-card'
import { RoadmapSwiper } from '../roadmap-swiper'
import { Header } from './components/header'

interface RoadmapSectionProps {
  roadmap: ScopeOfWork_Roadmap
}
export function RoadmapSection({ roadmap }: RoadmapSectionProps) {
  return (
    <div className="flex flex-col gap-6">
      <Header title={roadmap.title} description={roadmap.description} id={roadmap.id} />
      <div className="relative z-10 flex flex-col gap-6 sm:hidden">
        <div className="bg-border absolute top-0 left-1/2 -z-10 h-full w-1 -translate-x-1/2" />
        {roadmap.milestones.map((milestone) => (
          <MilestoneExtendedCard key={milestone.id} milestone={milestone} />
        ))}
      </div>
      <RoadmapSwiper milestones={roadmap.milestones} />
    </div>
  )
}
