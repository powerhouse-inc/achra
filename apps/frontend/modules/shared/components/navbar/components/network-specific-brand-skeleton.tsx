import { Skeleton } from '../../ui/skeleton'

function NetworkSpecificBrandSkeleton() {
  return (
    <div className="flex items-center gap-2">
      <Skeleton className="size-8 min-w-8 md:hidden" />
      <Skeleton className="hidden h-8 w-30 md:flex" />
    </div>
  )
}

export { NetworkSpecificBrandSkeleton }
