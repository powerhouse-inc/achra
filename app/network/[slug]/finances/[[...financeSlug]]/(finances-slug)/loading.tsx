import { BudgetStatementsSectionWrapperSkeleton } from '@/modules/finances/components/budget-statements-section/budget-statements-section-wrapper-skeleton'
import { PageContent } from '@/modules/shared/components/page-containers'

export default function FinancesPageLoading() {
  return (
    <PageContent variant="with-breadcrumb">
      <BudgetStatementsSectionWrapperSkeleton />
    </PageContent>
  )
}
