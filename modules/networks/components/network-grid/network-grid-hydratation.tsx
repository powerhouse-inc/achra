import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { useNetworkProfileQuery } from '@/modules/__generated__/graphql/switchboard-generated'
import { NETWORK_PROFILE_DOCUMENT_ID } from '../../config/constants'
import { fetchPowerhouseNetworkProfile } from '../../lib/fetch-networks'

async function NetworkGridHydration({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: useNetworkProfileQuery.getKey({
      docId: NETWORK_PROFILE_DOCUMENT_ID,
    }),
    queryFn: fetchPowerhouseNetworkProfile,
  })

  return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>
}

export { NetworkGridHydration }
