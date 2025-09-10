'use client'

import { useNetworkProfileQuery } from '@/modules/__generated__/graphql/switchboard-generated'
import { FAST_REFRESH_INTERVAL } from '@/modules/shared/config/constants'
import { NETWORK_PROFILE_DOCUMENT_ID } from '../../lib/constants'
import { mockedNetworks } from '../../mocks/networks'
import { NetworkCard } from '../network-card'

export function NetworkGrid() {
  const { data } = useNetworkProfileQuery(
    {
      docId: NETWORK_PROFILE_DOCUMENT_ID,
    },
    {
      refetchInterval: FAST_REFRESH_INTERVAL,
    },
  )

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {data?.NetworkProfile?.getDocument?.state && (
        <NetworkCard profile={data?.NetworkProfile?.getDocument?.state} />
      )}

      {mockedNetworks
        // the network from the api should be Powerhosue, so we need to filter it out
        // this should be temporary until the full implementation of the network profile is done
        .filter((network) => network.name !== data?.NetworkProfile?.getDocument?.state?.name)
        .map((network) => (
          <NetworkCard key={network.name} profile={network} />
        ))}
    </div>
  )
}
