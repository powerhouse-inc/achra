import { getBudgetStatements } from '@/modules/finances/services/budget-statement-service'
import { BudgetStatementsContent } from './budget-statements-content'
import { budgetStatementsSearchParamsCache } from './lib/search-params-server'
import type { MetricWithoutBudget, SortOptionValue } from '../../types'
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
  const { metrics, sort } = budgetStatementsSearchParamsCache.parse(searchParamsResolved)

  const budgetStatements = await getBudgetStatements(slug)

  return (
    <BudgetStatementsContent
      budgetMetric={metrics as MetricWithoutBudget}
      sortOption={sort as SortOptionValue}
      budgetStatements={budgetStatements}
      asSectionContent={asSectionContent}
    />
  )
}
