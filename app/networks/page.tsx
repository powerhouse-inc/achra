import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { useNetworkProfileQuery } from '@/modules/__generated__/graphql/switchboard-generated'
import { NetworkGrid } from '@/modules/networks/components/network-grid'
import { NETWORK_PROFILE_DOCUMENT_ID } from '@/modules/networks/config/constants'
import { fetchPowerhouseNetworkProfile } from '@/modules/networks/lib/fetch-networks'
import { PageContent } from '@/modules/shared/components/page-containers'

export default async function NetworksPage() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: useNetworkProfileQuery.getKey({
      docId: NETWORK_PROFILE_DOCUMENT_ID,
    }),
    queryFn: fetchPowerhouseNetworkProfile,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PageContent>
        <h1 className="text-foreground/50 md:text- mb-4 text-3xl font-bold tracking-tight">
          Networks
        </h1>

        <NetworkGrid />
      </PageContent>
    </HydrationBoundary>
  )
}
