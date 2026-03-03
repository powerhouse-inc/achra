import { Skeleton } from '@/modules/shared/components/ui/skeleton'

function ExpensesMetricChartFilterSkeleton() {
  return (
    <div className="flex w-full flex-col gap-6 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-2">
        <div className="text-foreground text-lg font-semibold">ExpensesMetric Chart</div>
        <Skeleton className="h-4 w-4 rounded-full" />
        <Skeleton className="h-4 w-4 rounded-full" />
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <Skeleton className="h-4 w-20" />
        <div className="flex gap-3">
          <Skeleton className="h-6 w-24 rounded-md" />
          <Skeleton className="h-6 w-28 rounded-md" />
        </div>
      </div>
    </div>
  )
}

export { ExpensesMetricChartFilterSkeleton }
