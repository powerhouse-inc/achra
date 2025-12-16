import { Skeleton } from '@/modules/shared/components/ui/skeleton'
import { BudgetStatementsDesktopSkeleton } from './budget-statements-desktop-skeleton'
import { BudgetStatementsMobileSkeleton } from './budget-statements-mobile-skeleton'
import { BudgetStatementsTabletSkeleton } from './budget-statements-tablet-skeleton'

export function BudgetStatementsSectionSkeleton() {
  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-4" />
          </div>
          <Skeleton className="h-4 w-32" />
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <Skeleton className="hidden h-4 w-20 md:block" />
          <div className="flex gap-2">
            <Skeleton className="h-10 w-[140px]" />
            <Skeleton className="h-10 w-[140px]" />
          </div>
        </div>
      </div>

      <BudgetStatementsMobileSkeleton />
      <BudgetStatementsTabletSkeleton />
      <BudgetStatementsDesktopSkeleton />
    </div>
  )
}
