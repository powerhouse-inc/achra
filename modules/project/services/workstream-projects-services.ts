import { useWorkstreamProjectQuery } from '@/modules/__generated__/graphql/switchboard-generated'

export async function getWorkstreamProjects(networkSlug: string, workstreamSlug: string) {
  const data = await useWorkstreamProjectQuery.fetcher({
    filter: {
      networkSlug,
      workstreamSlug,
    },
  })()

  if (!data.workstream[0]) {
    return null
  }

  return data.workstream[0]
}
