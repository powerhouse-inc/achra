import { createLoader, parseAsArrayOf, parseAsString, parseAsStringEnum } from 'nuqs/server'
import {
  type FullQueryWorkstream,
  WorkstreamStatus,
} from '@/modules/__generated__/graphql/switchboard-generated'
import { getWorkstreams } from '../../services/workstream-service'
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

  const workstreams = await getWorkstreams({
    networkSlugs: networkFilter,
    statuses,
    search: searchFilter,
  })

  const hasActiveFilters =
    searchFilter !== undefined ||
    statuses.length > 0 ||
    (networkFilter.length > 0 && slug === undefined)

  if (workstreams.length === 0) {
    return <WorkstreamEmpty hasActiveFilters={hasActiveFilters} />
  }

  return (
    <div className="flex flex-col gap-8">
      {workstreams.map((workstream) => (
        <WorkstreamCard key={workstream.slug} workstream={workstream as FullQueryWorkstream} />
      ))}
    </div>
  )
}

export { WorkstreamServerList }
