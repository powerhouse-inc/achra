import { getAllNetworks } from '@/modules/networks/services/networks-service'
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from '@/modules/shared/components/ui/empty'
import { cn } from '@/modules/shared/lib/utils'
import { NetworkCard } from '../../../network-card'

export async function NetworkGrid() {
  const allNetworks = await getAllNetworks()

  if (allNetworks.length === 0) {
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
    <div className={cn('grid grid-cols-1 gap-4', allNetworks.length > 1 && 'lg:grid-cols-2')}>
      {allNetworks.map((network) => {
        return <NetworkCard key={network.name} profile={network} />
      })}
    </div>
  )
}
