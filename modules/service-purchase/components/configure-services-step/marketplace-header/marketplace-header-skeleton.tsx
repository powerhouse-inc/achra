import { Skeleton } from '@/modules/shared/components/ui/skeleton'

/** Skeleton for MarketplaceHeader - mirrors Avatar + operator code/name (text-base/6) */
function MarketplaceHeaderSkeleton() {
  return (
    <div className="border-border flex items-center gap-3 border-b pb-2">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <Skeleton className="size-12 shrink-0 rounded-full sm:size-10" />
          <Skeleton className="h-6 w-52" />
        </div>
      </div>
    </div>
  )
}

export { MarketplaceHeaderSkeleton }
