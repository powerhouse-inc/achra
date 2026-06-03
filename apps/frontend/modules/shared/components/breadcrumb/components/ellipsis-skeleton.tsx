import { Skeleton } from '@achra/ui/skeleton'

function EllipsisSkeleton() {
  return (
    <div className="flex items-center gap-0.5">
      <Skeleton className="h-2 w-2 rounded-none" />
      <Skeleton className="h-2 w-2 rounded-none" />
      <Skeleton className="h-2 w-2 rounded-none" />
    </div>
  )
}

export { EllipsisSkeleton }
