import BudgetStatementsContent from './budget-statements-content'
import { budgetStatementsSearchParamsCache } from './lib/search-params-server'
import { getBudgetStatements } from './services/budget-stament-service'
import type { SortOptionValue } from './budget-stament-filters/popover-filter-content'
import type { MetricWithoutBudget } from './type'
import type { SearchParams } from 'nuqs/server'

interface BudgetStatementsContentWrapperProps {
  params: Promise<{
    slug: string
    financeSlug?: string[]
  }>
  searchParams: Promise<SearchParams>
  asSectionContent?: boolean
}

export async function BudgetStatementsContentWrapper({
  params,
  searchParams,
  asSectionContent = false,
}: Readonly<BudgetStatementsContentWrapperProps>) {
  const { slug } = await params
  const searchParamsResolved = await searchParams
  const { metricbs, sort } = budgetStatementsSearchParamsCache.parse(searchParamsResolved)

  const budgetStatements = await getBudgetStatements(slug)

  return (
    <BudgetStatementsContent
      budgetMetric={metricbs as MetricWithoutBudget}
      sortOption={sort as SortOptionValue}
      budgetStatements={budgetStatements}
      asSectionContent={asSectionContent}
    />
  )
}
