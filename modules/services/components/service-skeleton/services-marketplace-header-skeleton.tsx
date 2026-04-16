import { Skeleton } from '@/modules/shared/components/ui/skeleton'
import ff from '@/modules/shared/lib/feature-flags'

function ServicesMarketplaceHeaderSkeleton() {
  const filtersEnabled = ff.SERVICES_LISTING_FILTERS_ENABLED

  return (
    <div className="bg-accent overflow-hidden rounded-xl">
      <div className="flex flex-col items-center gap-4 px-4 py-14 text-center">
        {/* title */}
        <Skeleton className="bg-border h-8 w-full max-w-72 sm:h-9 lg:h-10" />
        {/* description (wraps to two lines on narrow viewports) */}
        <div className="flex w-full max-w-xl flex-col items-center gap-1">
          <Skeleton className="bg-border h-5 w-full max-w-md sm:h-6" />
          <Skeleton className="bg-border h-5 w-2/3 sm:h-6" />
        </div>
        {filtersEnabled && (
          /* search input */
          <Skeleton className="bg-border mt-4 h-10 w-full max-w-lg" />
        )}
      </div>
    </div>
  )
}

export { ServicesMarketplaceHeaderSkeleton }
