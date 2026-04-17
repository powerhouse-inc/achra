import { Skeleton } from '@/modules/shared/components/ui/skeleton'
import { FeaturedCardSkeleton } from './featured-card-skeleton'
import { MarketplaceCardSkeleton } from './marketplace-card-skeleton'

function ServicesContentSkeleton() {
  return (
    <div className="flex flex-col gap-10">
      {/* featured section */}
      <section className="flex flex-col gap-4">
        {/* section title */}
        <Skeleton className="h-7 w-full max-w-24" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
          {/* primary featured card spans 2 columns on sm+ */}
          <div className="col-span-1 sm:col-span-2">
            <FeaturedCardSkeleton />
          </div>
          {/* secondary slot renders a marketplace card */}
          <MarketplaceCardSkeleton />
        </div>
      </section>

      {/* category section */}
      <section className="flex flex-col gap-4">
        <div className="flex items-baseline gap-2">
          {/* section title */}
          <Skeleton className="h-7 w-full max-w-24" />
          {/* service count */}
          <Skeleton className="h-5 w-full max-w-20" />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          <MarketplaceCardSkeleton />
          <MarketplaceCardSkeleton />
          <MarketplaceCardSkeleton />
        </div>
      </section>
    </div>
  )
}

export { ServicesContentSkeleton }
