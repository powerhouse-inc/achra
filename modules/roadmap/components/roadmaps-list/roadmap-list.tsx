import { createLoader, parseAsArrayOf, parseAsString, parseAsStringEnum } from 'nuqs/server'
import {
  useRoadmapListQuery,
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

  const data = await useRoadmapListQuery.fetcher({
    filter: {
      networkSlug: slug,
      // TODO: Handle multiple statuses (should be implemented in the api)
      workstreamStatus: filters.statuses[0] ? filters.statuses[0] : undefined,
    },
  })()

  const hasRoadmaps = data.workstream.some((workstream) => {
    return (workstream.sow?.roadmaps.length ?? 0) > 0
  })

  if (!hasRoadmaps) {
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
        {data.workstream.map((workstream) =>
          workstream.sow?.roadmaps.map((roadmap) => (
            <RoadmapSection
              key={roadmap.id}
              roadmap={roadmap}
              networkSlug={slug}
              workstreamCode={workstream.code ?? ''}
              workstreamTitle={workstream.title ?? ''}
            />
          )),
        )}
      </div>
      <Button variant="outline" size="lg" className="-mt-2 w-58 self-center md:mt-0">
        Load More
      </Button>
    </>
  )
}

export { RoadmapList }
