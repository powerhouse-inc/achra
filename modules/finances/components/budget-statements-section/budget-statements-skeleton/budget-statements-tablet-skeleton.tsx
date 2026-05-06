import { Card } from '@/modules/shared/components/ui/card'
import { Skeleton } from '@/modules/shared/components/ui/skeleton'

function BudgetStatementsTabletSkeleton() {
  return (
    <div className="hidden flex-col space-y-4 md:flex lg:hidden">
      {Array.from({ length: 5 }).map((_, index) => (
        // it is okay to use index as key here because the skeleton is static
        // eslint-disable-next-line react/no-array-index-key
        <Card key={index} className="gap-0 rounded-xl p-0 shadow-sm">
          <div className="flex items-start justify-between px-4 pt-2 pb-2">
            <div className="flex flex-col gap-2">
              {/* Ecosystem Actor */}
              <Skeleton className="h-4 w-24" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
                <div className="space-y-1">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              {/* Reporting Month Label */}
              <Skeleton className="h-3 w-20" />
              {/* Value */}
              <Skeleton className="h-4 w-16" />
            </div>

            <div className="flex flex-col gap-1">
              {/* Metric Label */}
              <Skeleton className="h-3 w-20" />
              {/* Value */}
              <Skeleton className="h-4 w-24" />
            </div>

            <div className="flex flex-col gap-1.5">
              {/* Status Label */}
              <Skeleton className="h-3 w-12" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>

            <Skeleton className="h-9 w-9 shrink-0 rounded-md" />
          </div>

          <div className="px-4">
            <div className="bg-border my-2 h-[1px] w-full" />
          </div>

          <div className="flex w-full items-center justify-between px-4 py-1 pb-3">
            <Skeleton className="h-3 w-32" />
            <Skeleton className="h-3 w-32" />
          </div>
        </Card>
      ))}
    </div>
  )
}

export { BudgetStatementsTabletSkeleton }
