import { BudgetStatementListMobile } from '../budget-stament-mobile/budget-statement-list-mobile'
import { BudgetStamentTable } from '../budget-stament-table/budget-stament-table'

import { useBudgetStamentData } from './useBudgetStamentData'
import type { BudgetStatementExpenseReport, MetricWithoutBudget } from '../type'

export interface BudgetStatementsItemProps {
  builders: BudgetStatementExpenseReport[]
  budgetMetric: MetricWithoutBudget
}

export function BudgetStatementsItem({
  builders,
  budgetMetric,
}: Readonly<BudgetStatementsItemProps>) {
  const { buildersProcessed } = useBudgetStamentData({ builders })

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
