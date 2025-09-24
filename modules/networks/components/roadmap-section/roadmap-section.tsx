import type { ScopeOfWork_Roadmap } from '@/modules/__generated__/graphql/switchboard-generated'
import { SectionTitle } from '@/modules/networks/components/section-title'
import { MilestoneExtendedCard } from '@/modules/roadmap/components/milestone-extended-card'
import { RoadmapSwiper } from '@/modules/roadmap/components/roadmap-swiper'

interface RoadmapSectionProps {
  roadmap: ScopeOfWork_Roadmap
}

export default function RoadmapSection({ roadmap }: RoadmapSectionProps) {
  return (
    <section className="flex flex-col gap-6">
      <SectionTitle title="Roadmap" hash="roadmap" />
      <div className="font-semibold">Tabs component</div>
      <div className="font-semibold">{roadmap.description}</div>
      {/* Mobile Roadmap */}
      <div className="relative z-10 flex flex-col gap-6 sm:hidden">
        <div className="bg-border absolute top-0 left-1/2 -z-10 h-full w-1 -translate-x-1/2" />
        {roadmap.milestones.map((milestone) => (
          <MilestoneExtendedCard key={milestone.id} milestone={milestone} />
        ))}
      </div>
      <RoadmapSwiper milestones={roadmap.milestones} />
    </section>
  )
}
