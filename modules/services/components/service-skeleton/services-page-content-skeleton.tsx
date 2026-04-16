import { Skeleton } from '@/modules/shared/components/ui/skeleton'
import { FeaturedCardSkeleton } from './featured-card-skeleton'
import { MarketplaceCardSkeleton } from './marketplace-card-skeleton'

function ServicesContentSkeleton() {
  return (
    <div className="flex flex-col gap-10">
      {/* marketplace header */}
      <div className="flex flex-col items-center gap-4 text-center">
        {/* title */}
        <Skeleton className="h-8 w-full max-w-64 sm:h-9 lg:h-10" />
        {/* description */}
        <Skeleton className="h-5 w-full max-w-80 sm:h-6" />
        {/* search input */}
        <Skeleton className="h-10 w-full max-w-lg" />
      </div>

      {/* featured section */}
      <section className="flex flex-col gap-4">
        {/* section title */}
        <Skeleton className="h-7 w-full max-w-24" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
          <div className="col-span-1 sm:col-span-2">
            <FeaturedCardSkeleton />
          </div>
          <FeaturedCardSkeleton />
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

      {/* recommendation CTA */}
      <section className="bg-accent mt-4 rounded-2xl p-6 sm:p-8 lg:p-10">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1.5">
            {/* CTA title */}
            <Skeleton className="bg-border h-7 w-full max-w-56 sm:h-7" />
            {/* CTA description */}
            <Skeleton className="bg-border h-5 w-full max-w-80" />
          </div>
          {/* CTA button */}
          <Skeleton className="bg-border h-10 w-44 shrink-0" />
        </div>
      </section>
    </div>
  )
}

export { ServicesContentSkeleton }
