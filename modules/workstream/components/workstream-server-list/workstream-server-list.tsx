import { createLoader, parseAsArrayOf, parseAsString, parseAsStringEnum } from 'nuqs/server'
import {
  type FullQueryWorkstream,
  useWorkstreamsQuery,
  WorkstreamStatus,
} from '@/modules/__generated__/graphql/switchboard-generated'
import { WorkstreamCard } from '../workstream-card'
import { WorkstreamEmpty } from '../workstream-empty'

const filtersParser = createLoader({
  search: parseAsString.withDefault(''),
  statuses: parseAsArrayOf(parseAsStringEnum(Object.values(WorkstreamStatus))).withDefault([]),
  networks: parseAsArrayOf(parseAsString).withDefault([]),
})

interface WorkstreamServerListProps {
  params?: Promise<{ slug?: string }>
  searchParams: Promise<{
    search?: string
    networks?: string[]
    statuses?: string[]
  }>
}

async function WorkstreamServerList({ params, searchParams }: WorkstreamServerListProps) {
  const slug = (await params)?.slug
  const { search, statuses, networks } = await filtersParser(searchParams)

  // in the contribute page there're no networks filter as it is filtered by the network slug from the URL
  const networkFilter = slug ? [slug] : networks
  const searchFilter = search.trim().length > 0 ? search : undefined

  const data = await useWorkstreamsQuery.fetcher({
    filter: {
      networkNames: networkFilter,
      workstreamStatuses: statuses,
      workstreamTitle: searchFilter,
    },
  })()

  const hasActiveFilters =
    searchFilter !== undefined ||
    statuses.length > 0 ||
    (networkFilter.length > 0 && slug === undefined)

  if (data.workstreams.length === 0) {
    return <WorkstreamEmpty hasActiveFilters={hasActiveFilters} />
  }

  return (
    <div className="flex flex-col gap-8">
      {data.workstreams.map((workstream) => (
        <WorkstreamCard key={workstream.slug} workstream={workstream as FullQueryWorkstream} />
      ))}
    </div>
  )
}

export { WorkstreamServerList }
