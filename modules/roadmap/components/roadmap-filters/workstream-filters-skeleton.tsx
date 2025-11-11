import { Skeleton } from '@/modules/shared/components/ui/skeleton'

export default function RoadmapFiltersSkeleton() {
  return (
    <div className="grid grid-cols-[1fr_auto] grid-rows-1 gap-4 sm:grid-cols-1 sm:grid-rows-2 md:flex lg:gap-6">
      {/* Search Input Skeleton */}
      <Skeleton className="h-9 w-full" />

      {/* Desktop and Tablet Filters */}
      <div className="hidden items-center gap-4 sm:flex lg:gap-6">
        {/* Status Select Skeleton */}
        <Skeleton className="h-9 w-1/2 md:w-full md:max-w-54 md:min-w-54 lg:max-w-64 lg:min-w-64 xl:max-w-75 xl:min-w-75" />
      </div>

      {/* Mobile Filter Drawer */}
      <div className="flex items-center gap-4 sm:hidden">
        <Skeleton className="h-7 w-px" />
        <Skeleton className="size-9" />
      </div>
    </div>
  )
}
