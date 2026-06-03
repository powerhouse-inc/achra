import {
  type Network,
  useAllNetworksQuery,
} from '@/modules/__generated__/graphql/switchboard-generated'

export async function getAllNetworks(): Promise<Network[]> {
  const data = await useAllNetworksQuery.fetcher()()

  return data.allNetworks
    .map((item) => item.network ?? null)
    .filter((network): network is Network => network !== null)
}

export async function getNetworkBySlug(slug: string): Promise<Network | undefined> {
  const data = await useAllNetworksQuery.fetcher({
    filter: {
      networkSlug: slug,
    },
  })()

  const network = data.allNetworks[0]?.network

  return network ?? undefined // remove null from possible return values
}
