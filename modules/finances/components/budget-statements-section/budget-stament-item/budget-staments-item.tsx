import BudgetEmptyState from '../budget-empty-state'
import { BudgetStatementListMobile } from '../budget-stament-mobile/budget-statement-list-mobile'
import { BudgetStamentTable } from '../budget-stament-table/budget-stament-table'

import { useBudgetStamentData } from './useBudgetStamentData'
import type { SortOptionValue } from '../budget-stament-filters/popover-filter-content'
import type { BudgetStatement, MetricWithoutBudget } from '../type'

export interface BudgetStatementsItemProps {
  builders: BudgetStatement[]
  budgetMetric: MetricWithoutBudget
  sortOption?: SortOptionValue
  asSectionContent?: boolean
}

export function BudgetStatementsItem({
  builders,
  budgetMetric,
  sortOption,
  asSectionContent = false,
}: Readonly<BudgetStatementsItemProps>) {
  const { buildersProcessed } = useBudgetStamentData({ builders, sortOption })

  if (buildersProcessed.length === 0) {
    return <BudgetEmptyState />
  }

  return (
    <>
      <BudgetStamentTable
        builders={buildersProcessed}
        className="hidden lg:block"
        budgetMetric={budgetMetric}
        asSectionContent={asSectionContent}
      />
      <BudgetStatementListMobile
        builders={buildersProcessed}
        selectedMetric={budgetMetric}
        className="lg:hidden"
      />
    </>
  )
}
