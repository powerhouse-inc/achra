import BudgetEmptyState from '../budget-empty-state'
import { BudgetStatementListMobile } from '../budget-stament-mobile/budget-statement-list-mobile'
import { BudgetStamentTable } from '../budget-stament-table/budget-stament-table'

import { useBudgetStamentData } from './useBudgetStamentData'
import type { SortOptionValue } from '../budget-stament-filters/popover-filter-content'
import type { BudgetStatement, MetricWithoutBudget } from '../type'

export interface BudgetStatementsItemProps {
  budgetStatements: BudgetStatement[]
  budgetMetric: MetricWithoutBudget
  sortOption?: SortOptionValue
  asSectionContent?: boolean
}

export function BudgetStatementsItem({
  budgetStatements,
  budgetMetric,
  sortOption,
  asSectionContent = false,
}: Readonly<BudgetStatementsItemProps>) {
  const { processedBudgetStatements } = useBudgetStamentData({ budgetStatements, sortOption })

  if (processedBudgetStatements.length === 0) {
    return <BudgetEmptyState />
  }

  return (
    <>
      <BudgetStamentTable
        budgetStatements={processedBudgetStatements}
        className="hidden lg:block"
        budgetMetric={budgetMetric}
        asSectionContent={asSectionContent}
      />
      <BudgetStatementListMobile
        budgetStatements={processedBudgetStatements}
        selectedMetric={budgetMetric}
        className="lg:hidden"
        asSectionContent={asSectionContent}
      />
    </>
  )
}
