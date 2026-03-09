import { Skeleton } from '@/modules/shared/components/ui/skeleton'

export function FinancesReservesChartSkeleton() {
  return (
    <div className="flex w-full flex-col gap-3">
      <Skeleton className="h-60 w-full md:h-70 xl:h-90" />
      <div className="flex justify-center gap-4 md:gap-8">
        <Skeleton className="h-5 w-30" />
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-5 w-20" />
      </div>
    </div>
  )
}
