import { NetworkCardSkeleton } from '../network-card'

function NetworkGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4">
      <NetworkCardSkeleton />
    </div>
  )
}

export { NetworkGridSkeleton }
