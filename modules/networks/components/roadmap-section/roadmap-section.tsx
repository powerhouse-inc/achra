import {
  type ScopeOfWork_Milestone,
  useRoadmapListQuery,
} from '@/modules/__generated__/graphql/switchboard-generated'
import { SectionTitle } from '@/modules/networks/components/section-title'
import { MilestoneExtendedCard } from '@/modules/roadmap/components/milestone-extended-card'
import { RoadmapSwiper } from '@/modules/roadmap/components/roadmap-swiper'
import { ScrollableTabs, ScrollableTabsList } from '@/modules/shared/components/scrollable-tabs'
import { TabsContent, TabsTrigger } from '@/modules/shared/components/ui/tabs'
import { NetworkHomepageSections, SCROLL_MT_CLASSES } from '@/modules/shared/config/constants'
import { cn } from '@/modules/shared/lib/utils'
import { encodeSectionId } from '../../../shared/components/section-activation/section-id-utils'

interface RoadmapSectionProps {
  params: Promise<{ slug: string }>
}

export default async function RoadmapSection({ params }: RoadmapSectionProps) {
  const { slug } = await params

  const data = await useRoadmapListQuery.fetcher({
    filter: {
      networkSlug: slug,
    },
  })()

  const hasRoadmaps = data.workstream.some((workstream) => {
    return (workstream.sow?.roadmaps.length ?? 0) > 0
  })

  if (!hasRoadmaps) {
    return null
  }
  const roadmaps = data.workstream.flatMap((workstream) => workstream.sow?.roadmaps ?? [])
  const deliverables = data.workstream.flatMap((workstream) => workstream.sow?.deliverables ?? [])

  return (
    <section
      className={cn('flex flex-col gap-6 lg:gap-4 xl:gap-6', SCROLL_MT_CLASSES)}
      id={encodeSectionId(NetworkHomepageSections.Roadmap)}
    >
      <SectionTitle title="Roadmap" hash="roadmap" />
      <ScrollableTabs defaultValue={roadmaps[0].id} className="overflow-visible md:order-1">
        <ScrollableTabsList>
          <div className="flex w-fit">
            {roadmaps.map((roadmap) => (
              <TabsTrigger
                key={roadmap.id}
                value={roadmap.id}
                className="dark:data-[state=active]:bg-background text-muted-foreground data-[state=active]:text-foreground border-none px-3 py-1.5 leading-5"
              >
                {roadmap.title}
              </TabsTrigger>
            ))}
          </div>
        </ScrollableTabsList>
        {roadmaps.map((roadmap) => (
          <TabsContent key={roadmap.id} value={roadmap.id} className="flex flex-col gap-2 xl:gap-4">
            <div className="text-foreground/50 text-sm/5.5 font-semibold xl:text-base">
              {roadmap.description}
            </div>
            <div className="relative z-10 flex flex-col gap-6 sm:hidden">
              <div className="bg-border absolute top-0 left-1/2 -z-10 h-full w-1 -translate-x-1/2" />
              {roadmap.milestones.map((milestone) => (
                <MilestoneExtendedCard
                  key={milestone.id}
                  milestone={milestone as ScopeOfWork_Milestone}
                  networkSlug={slug}
                  roadmapSlug={roadmap.slug}
                  deliverables={deliverables}
                />
              ))}
            </div>
            <RoadmapSwiper
              milestones={roadmap.milestones as ScopeOfWork_Milestone[]}
              networkSlug={slug}
              roadmapSlug={roadmap.slug}
              deliverables={deliverables}
            />
          </TabsContent>
        ))}
      </ScrollableTabs>
    </section>
  )
}
