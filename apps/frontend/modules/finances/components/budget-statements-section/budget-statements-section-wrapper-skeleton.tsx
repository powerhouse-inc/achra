import { BudgetStatementFiltersSkeleton } from './budget-statement-filters/budget-statement-filters-skeleton'
import { BudgetStatementsSectionSkeleton } from './budget-statements-skeleton/budget-statements-section-skeleton'
import { BudgetStatementsTitleSkeleton } from './budget-statements-title-skeleton'

function BudgetStatementsSectionWrapperSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <BudgetStatementsTitleSkeleton />
      <BudgetStatementFiltersSkeleton />
      <BudgetStatementsSectionSkeleton />
    </div>
  )
}

export { BudgetStatementsSectionWrapperSkeleton }
