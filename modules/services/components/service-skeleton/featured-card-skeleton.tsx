import { Skeleton } from '@/modules/shared/components/ui/skeleton'

function FeaturedCardSkeleton() {
  return (
    <div className="flex gap-4 rounded-xl border p-4 sm:p-5">
      {/* icon */}
      <Skeleton className="size-10 shrink-0 rounded-lg sm:size-12" />
      {/* content */}
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex flex-col gap-1">
          {/* badge */}
          <Skeleton className="h-5 w-full max-w-20 rounded-full" />
          {/* title */}
          <Skeleton className="h-5 w-full max-w-40 sm:h-6" />
          {/* "by Powerhouse" */}
          <Skeleton className="h-4 w-full max-w-20" />
        </div>
        {/* description */}
        <div className="flex flex-col gap-1">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    </div>
  )
}

export { FeaturedCardSkeleton }
