'use client'

import { type Route } from 'next'
import { useNetworkProfileQuery } from '@/modules/__generated__/graphql/switchboard-generated'
import { NETWORK_PROFILE_DOCUMENT_ID } from '../../lib/constants'
import { networks } from '../../lib/mocked-networks'
import { NetworkCard } from '../network-card'

export function NetworkGrid() {
  const { data } = useNetworkProfileQuery(
    {
      docId: NETWORK_PROFILE_DOCUMENT_ID,
    },
    {
      refetchInterval: 5000, // 5 seconds
    },
  )

  // TODO: replace the types of NetworkCard with the right types from the API and complete the integration
  console.log('--> Network Profile:', data?.NetworkProfile?.getDocument?.state)

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {networks.map((network) => (
        <NetworkCard
          key={network.id}
          href={network.href}
          backgroundImage={network.backgroundImage}
          isotype={network.isotype}
          title={network.title}
          tag={network.tag}
          description={network.description}
          buttonText={network.buttonText}
          variant={network.variant}
          logotype={network.logotype}
        />
      ))}
    </div>
  )
}
