import {
  NetworkProfileDocument,
  type NetworkProfileQuery,
} from '@/modules/__generated__/graphql/switchboard-generated'
import { switchboardFetcher } from '@/shared/lib/fetcher'
import { NETWORK_PROFILE_DOCUMENT_ID } from './constants'

export async function fetchPowerhouseNetworkProfile(): Promise<NetworkProfileQuery> {
  return switchboardFetcher(NetworkProfileDocument, {
    docId: NETWORK_PROFILE_DOCUMENT_ID,
  })() as Promise<NetworkProfileQuery>
}
