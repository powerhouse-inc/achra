import { BudgetStatementsSectionSkeleton } from '@/modules/finances/components/budget-statements-section/budget-statements-skeleton/budget-statements-section-skeleton'
import { DashboardSectionWrapperSkeleton } from '../dashboard-section-wrapper/dashboard-section-wrapper-skeleton'

export function FinancesSectionSkeleton() {
  return (
    <DashboardSectionWrapperSkeleton>
      <BudgetStatementsSectionSkeleton />
    </DashboardSectionWrapperSkeleton>
  )
}
