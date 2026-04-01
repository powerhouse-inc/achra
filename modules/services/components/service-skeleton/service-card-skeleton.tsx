import { Card, CardContent } from '@/modules/shared/components/ui/card'
import { Skeleton } from '@/modules/shared/components/ui/skeleton'
import ServiceSectionSkeleton from './service-section-skeleton'

function ServicesCardSkeleton() {
  return (
    <Card className="bg-accent p-2 sm:p-3 md:p-4">
      <CardContent className="grid grid-cols-1 gap-4 px-0 sm:grid-cols-[170px_1fr] lg:grid-cols-[170px_1fr_328px] xl:grid-cols-[170px_1fr_520px] 2xl:grid-cols-[170px_1fr_632px]">
        {/* Cover image + buttons */}
        <div className="flex flex-col gap-2 sm:gap-4">
          <Skeleton className="bg-border h-32 w-full rounded-lg sm:h-30" />
          <div className="flex flex-col gap-2">
            <Skeleton className="bg-border h-9 w-full rounded-md" />
            <Skeleton className="bg-border h-9 w-full rounded-md" />
          </div>
        </div>
        {/* Title + description */}
        <div className="flex flex-col gap-2 sm:gap-4">
          <Skeleton className="bg-border h-6 w-48" />
          <div className="flex flex-col gap-1">
            <Skeleton className="bg-border h-4 w-full" />
            <Skeleton className="bg-border h-4 w-full" />
            <Skeleton className="bg-border h-4 w-3/4" />
          </div>
        </div>
        {/* Service sections */}
        <div className="flex flex-col gap-2 sm:col-span-2 sm:flex-row lg:col-span-1 lg:flex-col xl:flex-row">
          <ServiceSectionSkeleton />
          <ServiceSectionSkeleton />
        </div>
      </CardContent>
    </Card>
  )
}

export default ServicesCardSkeleton
