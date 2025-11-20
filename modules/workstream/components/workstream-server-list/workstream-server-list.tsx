import { createLoader, parseAsArrayOf, parseAsString, parseAsStringEnum } from 'nuqs/server'
import {
  type FullQueryWorkstream,
  useWorkstreamsQuery,
  WorkstreamStatus,
} from '@/modules/__generated__/graphql/switchboard-generated'
import { WorkstreamCard } from '../workstream-card'

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
  // TODO: add search filter once it is enabled in the api
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { search, statuses, networks } = await filtersParser(searchParams)

  const networkFilter = slug ? [slug] : networks

  const data = await useWorkstreamsQuery.fetcher({
    filter: {
      // TODO: Handle multiple network slugs (should be implemented in the api)
      networkSlug: networkFilter[0] ? networkFilter[0] : undefined,
      // Use workstreamStatuses for multiple statuses support
      workstreamStatuses: statuses.length > 0 ? statuses : undefined,
      workstreamTitle: undefined,
    },
  })()

  if (data.workstreams.length === 0) {
    return <div>No workstreams found</div>
  }

  return (
    <div className="flex flex-col gap-8">
      {data.workstreams.map((workstream, index) => (
        // TODO: replace the key with the workstream slug once it is available
        <WorkstreamCard key={index} workstream={workstream as FullQueryWorkstream} />
      ))}
    </div>
  )
}

export { WorkstreamServerList }
