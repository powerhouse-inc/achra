import { useAllNetworksQuery } from '@/modules/__generated__/graphql/switchboard-generated'
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from '@/modules/shared/components/ui/empty'
import { NetworkCard } from '../network-card'

export async function NetworkGrid() {
  const data = await useAllNetworksQuery.fetcher()()

  const networks = data?.allNetworks ?? []

  if (networks.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyTitle>No networks found</EmptyTitle>
          <EmptyDescription>There are no networks to display at this time.</EmptyDescription>
        </EmptyHeader>
      </Empty>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {networks?.map((network) => {
        if (!network.network) return null
        return <NetworkCard key={network.network.name} profile={network.network} />
      })}
    </div>
  )
}
