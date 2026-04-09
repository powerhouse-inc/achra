import { Skeleton } from '@/modules/shared/components/ui/skeleton'

function WorkstreamStatsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-x-6 xl:grid-cols-[1fr_1fr_1.3fr] sm:[&>*:last-child]:col-span-2 lg:[&>*:last-child]:col-span-1">
      <Skeleton className="h-9 md:h-10 xl:h-10.5" />
      <Skeleton className="h-9 md:h-10 xl:h-10.5" />
      <Skeleton className="h-9 md:h-10 xl:h-10.5" />
    </div>
  )
}

export { WorkstreamStatsSkeleton }
