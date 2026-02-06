import { Card, CardContent } from '@/modules/shared/components/ui/card'
import { Skeleton } from '@/modules/shared/components/ui/skeleton'

function ServicesCardSkeleton() {
  return (
    <Card className="bg-accent p-2 sm:p-3 md:p-4">
      <CardContent className="grid grid-cols-1 gap-4 px-0 sm:grid-cols-[120px_1fr] lg:grid-cols-[120px_1fr_328px] xl:grid-cols-[120px_1fr_520px] 2xl:grid-cols-[120px_1fr_632px]">
        <div className="flex flex-col gap-2 sm:gap-4">
          <Skeleton className="h-32 w-full rounded-lg sm:h-30" />
          <Skeleton className="h-9 w-full rounded-md" />
          <Skeleton className="h-9 w-full rounded-md" />
        </div>
        <div className="flex flex-col gap-2 sm:gap-4">
          <Skeleton className="h-6 w-48" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-3/4" />
        </div>
        <div className="hidden gap-2 lg:flex lg:flex-col xl:flex-row">
          <Skeleton className="h-40 w-full rounded-lg" />
          <Skeleton className="h-40 w-full rounded-lg" />
        </div>
      </CardContent>
    </Card>
  )
}

export function ServicesPageContentSkeleton() {
  return (
    <div className="flex w-full flex-col gap-6">
      <ServicesCardSkeleton />
      <ServicesCardSkeleton />
    </div>
  )
}
