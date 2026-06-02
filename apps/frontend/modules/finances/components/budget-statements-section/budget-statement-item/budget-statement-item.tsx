import type {
  BudgetStatement,
  MetricWithoutBudget,
  SortOptionValue,
} from '@/modules/finances/types'
import { BudgetEmptyState } from '../budget-empty-state'

import { BudgetStatementListMobile } from '../budget-statement-mobile/budget-statement-list-mobile'
import { BudgetStatementTable } from '../budget-statement-table'
import { useBudgetStatementData } from './use-budget-statement-data'

export interface BudgetStatementsItemProps {
  budgetStatements: BudgetStatement[]
  budgetMetric: MetricWithoutBudget
  sortOption?: SortOptionValue
  asSectionContent?: boolean
}

function BudgetStatementsItem({
  budgetStatements,
  budgetMetric,
  sortOption,
  asSectionContent = false,
}: Readonly<BudgetStatementsItemProps>) {
  const { processedBudgetStatements } = useBudgetStatementData({ budgetStatements, sortOption })

  if (processedBudgetStatements.length === 0) {
    return <BudgetEmptyState />
  }

  return (
    <>
      <BudgetStatementTable
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

export { BudgetStatementsItem }
