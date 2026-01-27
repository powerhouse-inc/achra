import { BudgetStatementsDesktopSkeleton } from './budget-statements-desktop-skeleton'
import { BudgetStatementsMobileSkeleton } from './budget-statements-mobile-skeleton'
import { BudgetStatementsTabletSkeleton } from './budget-statements-tablet-skeleton'

export function BudgetStatementsSectionSkeleton() {
  return (
    <div className="w-full space-y-6">
      <BudgetStatementsMobileSkeleton />
      <BudgetStatementsTabletSkeleton />
      <BudgetStatementsDesktopSkeleton />
    </div>
  )
}
