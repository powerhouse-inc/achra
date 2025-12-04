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
  const hasMoreThanOneRoadmap = roadmaps.length > 1

  return (
    <section
      // Note: The -mt-2 is to compensate for the swiper pagination dots height
      className={cn('-mt-2 flex flex-col gap-6 lg:gap-4 xl:gap-6', SCROLL_MT_CLASSES)}
      id={encodeSectionId(NetworkHomepageSections.Roadmap)}
    >
      <SectionTitle title="Roadmap" hash="roadmap" />
      <ScrollableTabs
        defaultValue={roadmaps[0].id}
        className="gap-4 overflow-visible md:order-1 xl:gap-6"
      >
        <ScrollableTabsList className={cn({ 'h-fit bg-transparent p-0': !hasMoreThanOneRoadmap })}>
          <div className="flex w-fit">
            {roadmaps.map((roadmap) => (
              <TabsTrigger
                key={roadmap.id}
                value={roadmap.id}
                className={cn({
                  'data-[state=active]:text-foreground/50 dark:text-foreground/50 border-none bg-transparent p-0 text-xl/6 data-[state=active]:font-bold dark:data-[state=active]:bg-transparent':
                    !hasMoreThanOneRoadmap,
                })}
              >
                {roadmap.title}
              </TabsTrigger>
            ))}
          </div>
        </ScrollableTabsList>
        {roadmaps.map((roadmap) => (
          <TabsContent key={roadmap.id} value={roadmap.id} className="flex flex-col gap-4 xl:gap-6">
            <div
              className={cn('text-foreground/50 text-sm/5.5 font-semibold xl:text-base', {
                hidden: !roadmap.description,
              })}
            >
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
