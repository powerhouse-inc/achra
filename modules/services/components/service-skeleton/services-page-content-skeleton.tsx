import { Skeleton } from '@/modules/shared/components/ui/skeleton'
import ServicesCardSkeleton from './service-card-skeleton'

export function ServicesPageContentSkeleton() {
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
