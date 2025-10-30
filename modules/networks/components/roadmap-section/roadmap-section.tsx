import type { ScopeOfWork_Roadmap } from '@/modules/__generated__/graphql/switchboard-generated'
import { SectionTitle } from '@/modules/networks/components/section-title'
import { MilestoneExtendedCard } from '@/modules/roadmap/components/milestone-extended-card'
import { RoadmapSwiper } from '@/modules/roadmap/components/roadmap-swiper'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/modules/shared/components/ui/tabs'
import { ROADMAP_TABS_CONFIG } from './constants'

interface RoadmapSectionProps {
  roadmaps: ScopeOfWork_Roadmap[]
}

export default function RoadmapSection({ roadmaps }: RoadmapSectionProps) {
  return (
    <section className="flex flex-col">
      <SectionTitle title="Roadmap" hash="roadmap" />
      <Tabs defaultValue="phase-1" className="gap-0">
        <TabsList className="text-foreground/50 no-scrollbar -mx-2 h-fit w-full justify-start overflow-x-auto bg-transparent p-0">
          <div className="flex w-fit gap-2 py-4 pl-2 xl:py-6">
            {ROADMAP_TABS_CONFIG.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="data-[state=active]:bg-accent! h-fit rounded-t-lg rounded-b-none border-0 px-4 text-sm/5.5 font-semibold shadow-lg data-[state=active]:shadow-lg lg:text-base/6"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </div>
        </TabsList>
        {roadmaps.map((roadmap, index) => (
          <TabsContent
            key={roadmap.id}
            value={`phase-${index + 1}`}
            className="flex flex-col gap-4 xl:gap-6"
          >
            <div className="text-foreground/50 text-sm/5.5 font-semibold xl:text-base">
              {roadmap.description}
            </div>
            <div className="relative z-10 flex flex-col gap-6 sm:hidden">
              <div className="bg-border absolute top-0 left-1/2 -z-10 h-full w-1 -translate-x-1/2" />
              {roadmap.milestones.map((milestone) => (
                <MilestoneExtendedCard key={milestone.id} milestone={milestone} />
              ))}
            </div>
            <RoadmapSwiper milestones={roadmap.milestones} />
          </TabsContent>
        ))}
      </Tabs>
    </section>
  )
}
