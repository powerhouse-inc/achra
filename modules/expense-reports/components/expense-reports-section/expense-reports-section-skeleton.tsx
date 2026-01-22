import { TabSkeleton, TabsSkeleton } from '@/modules/shared/components/tab-skeleton'
import { Skeleton } from '@/modules/shared/components/ui/skeleton'
import { ActualTableSkeleton } from './actuals-table-skeleton'
import { BreakdownTableSkeleton } from './breakdown-table-skeleton'

function ExpenseReportsSectionSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-accent pt-2 pb-6 shadow-sm">
        <div className="container">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <Skeleton className="bg-border h-5.5 w-64" />

              <ActualTableSkeleton />
            </div>

            <div className="flex flex-col gap-4">
              <Skeleton className="bg-border h-5.5 w-50" />

              <TabsSkeleton>
                <TabSkeleton className="w-34" active />
                <TabSkeleton className="w-47" />
              </TabsSkeleton>

              <BreakdownTableSkeleton />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { ExpenseReportsSectionSkeleton }
