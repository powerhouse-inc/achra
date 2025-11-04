import { NetworkCardSkeleton } from '../network-card'

function NetworkGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {Array.from({ length: 6 }).map((_, index) => (
        // it is okay to use index as key here because the skeleton is static
        // eslint-disable-next-line react/no-array-index-key
        <NetworkCardSkeleton key={index} />
      ))}
    </div>
  )
}

export { NetworkGridSkeleton }
