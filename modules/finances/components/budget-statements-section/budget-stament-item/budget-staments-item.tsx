'use client'
import type { Team } from '@/modules/shared/types/team'
import { BudgetStatementListMobile } from '../budget-stament-mobile/budget-statement-list-mobile'
import { BudgetStamentTable } from '../budget-stament-table/budget-stament-table'

import { useBudgetStamentData } from './useBudgetStamentData'

export interface BudgetStatementsItemProps {
  builders: Team[]
}

export function BudgetStatementsItem({ builders }: BudgetStatementsItemProps) {
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
