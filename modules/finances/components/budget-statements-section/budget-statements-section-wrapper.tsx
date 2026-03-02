import { Suspense } from 'react'
import { BudgetStatementsContentWrapper } from '@/modules/finances/components/budget-statements-section/budget-statements-content-wrapper'
import { BudgetStatementsSectionSkeleton } from '@/modules/finances/components/budget-statements-section/budget-statements-skeleton/budget-statements-section-skeleton'
import { BudgetStatementsTitle } from '@/modules/finances/components/budget-statements-section/budget-statements-title'
import { BudgetStatementsTitleSkeleton } from '@/modules/finances/components/budget-statements-section/budget-statements-title-skeleton'
import { FinancesSections } from '@/modules/finances/components/config/const'
import { ErrorBoundaryWithPresets } from '@/modules/shared/components/error-state/error-boundry-with-presets'
import { encodeSectionId } from '@/modules/shared/components/section-activation'
import { SCROLL_MT_CLASSES } from '@/modules/shared/config/constants'
import { cn } from '@/modules/shared/lib/utils'
import { BudgetStatementFilters } from './budget-statement-filters/budget-statement-filters'
import { BudgetStatementFiltersSkeleton } from './budget-statement-filters/budget-statement-filters-skeleton'

interface BudgetStatementsSectionWrapperProps {
  params: Promise<{
    slug: string
    financeSlug?: string[]
  }>
  searchParams: Promise<{
    year?: string
  }>
}

export function BudgetStatementsSectionWrapper({
  params,
  searchParams,
}: Readonly<BudgetStatementsSectionWrapperProps>) {
  return (
    <section
      className={cn('flex w-full flex-col gap-4', SCROLL_MT_CLASSES)}
      id={encodeSectionId(FinancesSections.BudgetStatements)}
    >
      <div className="flex w-full items-center justify-between gap-4">
        <Suspense fallback={<BudgetStatementsTitleSkeleton />}>
          <BudgetStatementsTitle />
        </Suspense>
        <Suspense fallback={<BudgetStatementFiltersSkeleton />}>
          <BudgetStatementFilters />
        </Suspense>
      </div>
      <ErrorBoundaryWithPresets description="We ran into an unexpected error while loading the budget statements. Please try again later.">
        <Suspense fallback={<BudgetStatementsSectionSkeleton />}>
          <BudgetStatementsContentWrapper params={params} searchParams={searchParams} />
        </Suspense>
      </ErrorBoundaryWithPresets>
    </section>
  )
}
