import {
  type Network,
  NetworkProfileDocument,
  type NetworkProfileQuery,
} from '@/modules/__generated__/graphql/switchboard-generated'
import { slugify } from '@/modules/shared/lib/slug'
import { switchboardFetcher } from '@/shared/lib/fetcher'
import { NETWORK_PROFILE_DOCUMENT_ID } from '../config/constants'
import { mockedNetworks } from '../mocks/networks'

export async function fetchPowerhouseNetworkProfile(): Promise<NetworkProfileQuery> {
  return switchboardFetcher(NetworkProfileDocument, {
    docId: NETWORK_PROFILE_DOCUMENT_ID,
  })() as Promise<NetworkProfileQuery>
}

export async function fetchNetworkProfile(networkSlug: string): Promise<Network | undefined> {
  if (!networkSlug) {
    return undefined
  }

  // TODO: replace with actual network profile fetch
  await new Promise((resolve) => setTimeout(resolve, 200))

  const network = mockedNetworks.find((network) => slugify(network.name) === networkSlug)

  return network
}
