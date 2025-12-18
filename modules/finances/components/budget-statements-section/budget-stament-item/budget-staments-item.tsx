'use client'
import { BudgetStatementListMobile } from '../budget-stament-mobile/budget-statement-list-mobile'
import { BudgetStamentTable } from '../budget-stament-table/budget-stament-table'

import { useBudgetStamentData } from './useBudgetStamentData'
import type { BudgetStatementExpenseReport } from '../type'

export interface BudgetStatementsItemProps {
  builders: BudgetStatementExpenseReport[]
}

export function BudgetStatementsItem({ builders }: Readonly<BudgetStatementsItemProps>) {
  const { buildersProcessed } = useBudgetStamentData({ builders })

  return (
    <>
      <BudgetStamentTable builders={buildersProcessed} className="hidden lg:block" />
      <BudgetStatementListMobile
        builders={buildersProcessed}
        selectedMetric="Actuals"
        className="lg:hidden"
      />
    </>
  )
}
