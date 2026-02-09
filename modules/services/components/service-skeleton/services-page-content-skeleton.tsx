import { Skeleton } from '@/modules/shared/components/ui/skeleton'
import ServicesCardSkeleton from './service-card-skeleton'

export function ServicesContentSkeleton() {
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
