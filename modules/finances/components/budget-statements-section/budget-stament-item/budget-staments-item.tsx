import { BudgetStatementListMobile } from '../budget-stament-mobile/budget-statement-list-mobile'
import { BudgetStamentTable } from '../budget-stament-table/budget-stament-table'

import { useBudgetStamentData } from './useBudgetStamentData'
import type { SortOptionValue } from '../budget-stament-filters/popover-filter-content'
import type { BudgetStatement, MetricWithoutBudget } from '../type'

export interface BudgetStatementsItemProps {
  builders: BudgetStatement[]
  budgetMetric: MetricWithoutBudget
  sortOption?: SortOptionValue
}

export function BudgetStatementsItem({
  builders,
  budgetMetric,
  sortOption,
}: Readonly<BudgetStatementsItemProps>) {
  const { buildersProcessed } = useBudgetStamentData({ builders, sortOption })

  return (
    <>
      <BudgetStamentTable
        builders={buildersProcessed}
        className="hidden lg:block"
        budgetMetric={budgetMetric}
      />
      <BudgetStatementListMobile
        builders={buildersProcessed}
        selectedMetric={budgetMetric}
        className="lg:hidden"
      />
    </>
  )
}
