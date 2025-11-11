import { Skeleton } from '@/modules/shared/components/ui/skeleton'
import { cn } from '@/modules/shared/lib/utils'

interface MonthNavigationSkeletonProps {
  className?: string
}

function MonthNavigationSkeleton({ className }: MonthNavigationSkeletonProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      {/* Navigation controls */}
      <div className="flex gap-0.5">
        <Skeleton className="h-9 w-9 rounded-md" />
        <Skeleton className="h-9 w-9 rounded-md" />
      </div>

      {/* Current month display */}
      <div>
        <Skeleton className="h-6 w-24 rounded-md" />
      </div>
    </div>
  )
}

export { MonthNavigationSkeleton }
