import { BudgetStatementsContentWrapper } from '@/modules/finances/components/budget-statements-section/budget-statements-content-wrapper'
import { BudgetStatementsTitle } from '@/modules/finances/components/budget-statements-section/budget-statements-title'
import { FinancesSections } from '@/modules/finances/lib/constants'
import { ErrorBoundaryWithPresets } from '@/modules/shared/components/error-state/error-boundry-with-presets'
import { encodeSectionId } from '@/modules/shared/components/section-activation'
import { SCROLL_MT_CLASSES } from '@/modules/shared/lib/constants'
import { cn } from '@/modules/shared/lib/utils'
import { BudgetStatementFilters } from './budget-statement-filters/budget-statement-filters'

interface BudgetStatementsSectionWrapperProps {
  params: Promise<{
    slug: string
    financeSlug?: string[]
  }>
  searchParams: Promise<{
    year?: string
  }>
}

function BudgetStatementsSectionWrapper({
  params,
  searchParams,
}: Readonly<BudgetStatementsSectionWrapperProps>) {
  return (
    <section
      className={cn('flex w-full flex-col gap-4', SCROLL_MT_CLASSES)}
      id={encodeSectionId(FinancesSections.BudgetStatements)}
    >
      <div className="flex w-full items-center justify-between gap-4">
        <BudgetStatementsTitle />
        <BudgetStatementFilters />
      </div>
      <ErrorBoundaryWithPresets description="We ran into an unexpected error while loading the budget statements. Please try again later.">
        <BudgetStatementsContentWrapper params={params} searchParams={searchParams} />
      </ErrorBoundaryWithPresets>
    </section>
  )
}

export { BudgetStatementsSectionWrapper }
