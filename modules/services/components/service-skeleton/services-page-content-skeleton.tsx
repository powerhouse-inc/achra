import { Skeleton } from '@/modules/shared/components/ui/skeleton'
import ServicesCardSkeleton from './service-card-skeleton'
import ServicesFiltersSkeleton from './service-filter-skeleton'

export function ServicesPageContentSkeleton() {
  return (
    <div className="flex w-full flex-col gap-6">
      {/* Filters: tabs + search */}
      <ServicesFiltersSkeleton />
      {/* Section title */}
      <Skeleton className="h-6 w-24" />
      {/* Cards */}
      <ServicesCardSkeleton />
      <ServicesCardSkeleton />
    </div>
  )
}
