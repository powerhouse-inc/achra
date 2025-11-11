import { Skeleton } from '@/modules/shared/components/ui/skeleton'
import { cn } from '@/modules/shared/lib/utils'

interface ExpenseReportTabsSkeletonProps {
  className?: string
}

function ExpenseReportTabsSkeleton({ className }: ExpenseReportTabsSkeletonProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {/* TabsList skeleton */}
      <div className="bg-muted inline-flex h-9 w-fit items-center justify-center gap-1 rounded-lg p-0.75">
        {/* Account Snapshot tab skeleton */}
        <Skeleton className="h-[calc(100%-1px)] w-34 rounded-md px-2 py-1" />

        {/* Expense Reports tab skeleton */}
        <Skeleton className="h-[calc(100%-1px)] w-33 rounded-md px-2 py-1" />
      </div>
    </div>
  )
}

export { ExpenseReportTabsSkeleton }
