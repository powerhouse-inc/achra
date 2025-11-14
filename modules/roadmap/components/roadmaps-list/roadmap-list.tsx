import { createLoader, parseAsArrayOf, parseAsString, parseAsStringEnum } from 'nuqs/server'
import {
  useRoadmapsListQuery,
  WorkstreamStatus,
} from '@/modules/__generated__/graphql/switchboard-generated'
import { RoadmapSection } from '@/modules/roadmap/components/roadmap-section/roadmap-section'
import { Button } from '@/modules/shared/components/ui/button'
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from '@/modules/shared/components/ui/empty'

const filtersParser = createLoader({
  search: parseAsString.withDefault(''),
  statuses: parseAsArrayOf(parseAsStringEnum(Object.values(WorkstreamStatus))).withDefault([]),
})

interface RoadmapListProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{
    search: string
    statuses: string[]
  }>
}

async function RoadmapList({ params, searchParams }: RoadmapListProps) {
  const { slug } = await params

  const filters = await filtersParser(searchParams)

  const data = await useRoadmapsListQuery.fetcher({
    filter: {
      networkSlug: slug,
      // TODO: Handle multiple statuses (should be implemented in the api)
      workstreamStatus: filters.statuses[0] ? filters.statuses[0] : undefined,
    },
  })()

  // TODO: Check with the team or client if it is expected to have multiple scope of work per network
  const roadmaps = data.scopeOfWorkByNetworkOrStatus[0].roadmaps

  if (roadmaps.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyTitle>No roadmaps found</EmptyTitle>
          <EmptyDescription>There are no roadmaps to display at this time.</EmptyDescription>
        </EmptyHeader>
      </Empty>
    )
  }

  return (
    <>
      <div className="flex flex-col gap-14">
        {roadmaps.map((roadmap) => (
          <RoadmapSection key={roadmap.id} roadmap={roadmap} networkSlug={slug} />
        ))}
      </div>
      <Button variant="outline" size="lg" className="-mt-2 w-58 self-center md:mt-0">
        Load More
      </Button>
    </>
  )
}

export { RoadmapList }
