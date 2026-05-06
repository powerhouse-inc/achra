import { BudgetStatementsContentWrapper } from '@/modules/finances/components/budget-statements-section'
import { BudgetStatementFilters } from '@/modules/finances/components/budget-statements-section/budget-statement-filters/budget-statement-filters'
import { BudgetStatementFiltersProvider } from '@/modules/finances/components/budget-statements-section/budget-statement-filters/budget-statement-filters-context'
import { ErrorBoundaryWithPresets } from '@/modules/shared/components/error-state/error-boundry-with-presets'
import { StripedCardContent } from '@/modules/shared/components/striped-card'
import { NetworkDashboardSections } from '@/modules/shared/lib/constants'
import { DashboardSectionWrapper } from '../dashboard-section-wrapper'
import type { Route } from 'next'
import type { SearchParams } from 'nuqs/server'

interface FinancesSectionProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<SearchParams>
  networkName: string
}

export async function FinancesSection({
  params,
  searchParams,
  networkName,
}: Readonly<FinancesSectionProps>) {
  const { slug } = await params

  return (
    <DashboardSectionWrapper
      id={NetworkDashboardSections.Finances}
      title="Finances"
      hash="finances"
      cardTitle={`All financial reports for Builders in the ${networkName} network`}
      href={`/network/${slug}/finances` as Route}
    >
      <BudgetStatementFiltersProvider>
        <StripedCardContent className="flex justify-end px-2 py-0">
          <BudgetStatementFilters />
        </StripedCardContent>
        <StripedCardContent className="p-0">
          <ErrorBoundaryWithPresets className="mb-2">
            <BudgetStatementsContentWrapper
              params={params}
              searchParams={searchParams}
              asSectionContent
            />
          </ErrorBoundaryWithPresets>
        </StripedCardContent>
      </BudgetStatementFiltersProvider>
    </DashboardSectionWrapper>
  )
}
