import { useWorkstreamDetailsQuery } from '@/modules/__generated__/graphql/switchboard-generated'

/**
 * Gets the details of a workstream
 *
 * @param networkSlug The slug of the network
 * @param workstreamSlug The slug of the workstream
 *
 * @returns The workstream details or null if not found
 */
export async function getWorkstreamDetails(networkSlug: string, workstreamSlug: string) {
  const data = await useWorkstreamDetailsQuery.fetcher({
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
