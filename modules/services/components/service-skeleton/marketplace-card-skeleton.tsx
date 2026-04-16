import { Skeleton } from '@/modules/shared/components/ui/skeleton'

function MarketplaceCardSkeleton() {
  return (
    <div className="flex h-full flex-col gap-3 rounded-xl border p-4">
      {/* icon + title row */}
      <div className="flex items-start gap-3">
        <Skeleton className="size-12 shrink-0 rounded-lg" />
        <div className="flex min-w-0 flex-col gap-0.5">
          {/* title */}
          <Skeleton className="h-5 w-full max-w-32 sm:h-6" />
          {/* "by Powerhouse" */}
          <Skeleton className="h-4 w-full max-w-20" />
        </div>
      </div>
      {/* description */}
      <div className="flex flex-col gap-1">
        <Skeleton className="h-4 w-full sm:h-5" />
        <Skeleton className="h-4 w-full sm:h-5" />
        <Skeleton className="h-4 w-2/3 sm:h-5" />
      </div>
      {/* badge */}
      <div className="mt-auto">
        <Skeleton className="h-5 w-full max-w-24 rounded-full" />
      </div>
    </div>
  )
}

export { MarketplaceCardSkeleton }
