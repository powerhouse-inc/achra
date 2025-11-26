import { Card } from '@/modules/shared/components/ui/card'
import { Separator } from '@/modules/shared/components/ui/separator'
import { Skeleton } from '@/modules/shared/components/ui/skeleton'
import { cn } from '@/shared/lib/utils'

export function BudgetUtilizationCardSkeleton() {
  return (
    <Card className="w-full shadow-sm px-8 py-3.25 lg:py-4 flex flex-col gap-0">
      {/* Top Section: Numbers */}
      <div className="flex flex-row justify-center gap-2.5 items-center">
        <Skeleton className="h-9 w-24 rounded-lg sm:w-32" />
        <Separator
          orientation="vertical"
          className={cn(
            'origin-center rotate-12 self-center h-8! w-0.5!',
          )}
        />
        <Skeleton className="h-9 w-24 rounded-lg sm:w-32" />
      </div>

      {/* Description */}
      <div className="flex justify-center mt-0.25">
        <Skeleton className="h-4 w-40 rounded" />
      </div>

      <Separator className="my-2.5 h-px" orientation="horizontal" />

      {/* Percent */}
      <div className="flex justify-center">
        <Skeleton className="h-7 w-16 rounded-md" />
      </div>

      {/* Progress Bar */}
      <div className="mt-1 mb-1 flex items-center gap-2">
        <Skeleton className="h-4 w-full rounded-full" />
      </div>

      {/* Legend */}
      <div className="flex justify-between pl-px md:mt-px 2xl:mt-0">
        <div className="flex items-center gap-2">
          <Skeleton className="h-3 w-3 shrink-0 rounded-full" />
          <Skeleton className="h-4 w-32 rounded sm:w-40" />
        </div>

        <div className="flex items-center gap-2">
          <Skeleton className="h-3 w-3 shrink-0 rounded-full" />
          <Skeleton className="h-4 w-20 rounded sm:w-24" />
        </div>
      </div>
    </Card>
  )
}
