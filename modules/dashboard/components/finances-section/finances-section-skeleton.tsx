import { BudgetStatementsSectionSkeleton } from '@/modules/finances/components/budget-statements-section/budget-statements-skeleton/budget-statements-section-skeleton'
import { DashboardSectionWrapperSkeleton } from '../dashboard-section-wrapper'

function FinancesSectionSkeleton() {
  return (
    <DashboardSectionWrapperSkeleton>
      <BudgetStatementsSectionSkeleton />
    </DashboardSectionWrapperSkeleton>
  )
}

export { FinancesSectionSkeleton }
