import { Skeleton } from '@/modules/shared/components/ui/skeleton'

export default function WorkstreamFiltersSkeleton() {
  return (
    <div className="flex items-center gap-6">
      {/* Search Input Skeleton */}
      <Skeleton className="h-9 w-full" />

      {/* Status Select Skeleton */}
      <Skeleton className="h-9 min-w-64 xl:min-w-75" />

      {/* Network Select Skeleton */}
      <Skeleton className="h-9 min-w-46 xl:min-w-75" />
    </div>
  )
}
