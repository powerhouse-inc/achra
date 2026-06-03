import { cn } from '@achra/ui/lib/utils'
import { Skeleton } from '@achra/ui/skeleton'

interface OperationalMetricSkeletonProps {
  labelClassName?: string
  valueClassName?: string
}

function OperationalMetricSkeleton({
  labelClassName,
  valueClassName,
}: OperationalMetricSkeletonProps) {
  return (
    <div className="border-input flex min-h-9.5 w-full items-center justify-between rounded-xl border p-2 sm:gap-2">
      <Skeleton className={cn('h-4.5 w-full max-w-24 shrink-0', labelClassName)} />
      <Skeleton className={cn('h-5.5 w-full max-w-20 shrink-0', valueClassName)} />
    </div>
  )
}

export { OperationalMetricSkeleton }
