import type { ScopeOfWork_Roadmap } from '@/modules/__generated__/graphql/switchboard-generated'
import { SectionTitle } from '@/modules/networks/components/section-title'
import { MilestoneExtendedCard } from '@/modules/roadmap/components/milestone-extended-card'
import { RoadmapSwiper } from '@/modules/roadmap/components/roadmap-swiper'
import { ScrollableTabs, ScrollableTabsList } from '@/modules/shared/components/scrollable-tabs'
import { TabsContent, TabsTrigger } from '@/modules/shared/components/ui/tabs'
import { NetworkHomepageSections, SCROLL_MT_CLASSES } from '@/modules/shared/config/constants'
import { cn } from '@/modules/shared/lib/utils'
import { encodeSectionId } from '../../../shared/components/section-activation/section-id-utils'
import { ROADMAP_TABS_CONFIG } from './constants'

interface RoadmapSectionProps {
  roadmaps: ScopeOfWork_Roadmap[]
}

export default function RoadmapSection({ roadmaps }: RoadmapSectionProps) {
  return (
    <section
      className={cn('flex flex-col', SCROLL_MT_CLASSES)}
      id={encodeSectionId(NetworkHomepageSections.Roadmap)}
    >
      <SectionTitle title="Roadmap" hash="roadmap" />
      <ScrollableTabs defaultValue="phase-1" className="md:order-1">
        <ScrollableTabsList>
          <div className="flex w-fit">
            {ROADMAP_TABS_CONFIG.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="text-muted-foreground data-[state=active]:text-foreground border-none px-3 py-1.5 leading-5"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </div>
        </ScrollableTabsList>
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
      </ScrollableTabs>
    </section>
  )
}
