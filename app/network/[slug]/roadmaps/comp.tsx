import { createLoader, parseAsString, parseAsStringEnum } from 'nuqs/server'
import {
  useRoadmapListQuery,
  WorkstreamStatus,
} from '@/modules/__generated__/graphql/switchboard-generated'
import { RoadmapSection } from '@/modules/roadmap/components/roadmap-section/roadmap-section'
import { mockedRoadmaps } from '@/modules/roadmap/mocks'
import { Button } from '@/modules/shared/components/ui/button'

const filtersParser = createLoader({
  search: parseAsString.withDefault(''),
  statuses: parseAsStringEnum(Object.values(WorkstreamStatus)),
})

interface RoadmapListProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{
    search: string
    statuses: string
  }>
}

async function RoadmapList({ params, searchParams }: RoadmapListProps) {
  const { slug } = await params

  const filters = await filtersParser(searchParams)
  console.log('>>>> ', filters)

  const data = await useRoadmapListQuery.fetcher({
    filter: {
      networkSlug: slug,
      workstreamStatus: filters.statuses,
    },
  })()

  console.log(data)

  // if (data.length === 0) {
  //   return <div>Empty State</div>
  // }

  return (
    <>
      <div className="flex flex-col gap-14">
        {mockedRoadmaps.map((roadmap) => (
          <RoadmapSection key={roadmap.id} roadmap={roadmap} />
        ))}
      </div>
      <Button variant="outline" size="lg" className="-mt-2 w-58 self-center md:mt-0">
        Load More
      </Button>
    </>
  )
}

export { RoadmapList }
