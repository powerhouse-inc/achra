import { Skeleton } from '@/modules/shared/components/ui/skeleton'
import ff from '@/modules/shared/lib/feature-flags'
import { ServicesCardSkeleton } from './service-card-skeleton'
import { ServicesFiltersSkeleton } from './service-filter-skeleton'

function ServicesContentSkeleton() {
  return (
    <>
      {/* Section title */}
      <Skeleton className="h-6 w-24" />
      {/* Cards */}
      <ServicesCardSkeleton />
      <ServicesCardSkeleton />
    </>
  )
}

function ServicesPageSkeleton() {
  return (
    <>
      {ff.SERVICES_LISTING_FILTERS_ENABLED && <ServicesFiltersSkeleton />}
      <ServicesContentSkeleton />
    </>
  )
}

export { ServicesContentSkeleton, ServicesPageSkeleton }
