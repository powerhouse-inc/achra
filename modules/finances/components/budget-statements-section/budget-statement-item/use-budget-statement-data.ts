import { parseAsArrayOf, parseAsString, useQueryState } from 'nuqs'
import { useMemo } from 'react'
import { compareMonth, compareString } from '@/modules/finances/lib/budget-statement-utils'
import type { BudgetStatement, SortOptionValue } from '@/modules/finances/types'

interface UseBudgetStatementDataProps {
  budgetStatements: BudgetStatement[]
  sortOption?: SortOptionValue
}

const SORTERS: Record<SortOptionValue, (a: BudgetStatement, b: BudgetStatement) => number> = {
  reporting_newest: (a, b) => compareMonth(b.month, a.month),
  reporting_oldest: (a, b) => compareMonth(a.month, b.month),
  modified_newest: (a, b) => compareString(b.lastModifiedAtUtcIso, a.lastModifiedAtUtcIso),
  modified_oldest: (a, b) => compareString(a.lastModifiedAtUtcIso, b.lastModifiedAtUtcIso),
}

export function useBudgetStatementData({
  budgetStatements,
  sortOption,
}: Readonly<UseBudgetStatementDataProps>) {
  const [selectedStatuses] = useQueryState('status', parseAsArrayOf(parseAsString))

  const processedBudgetStatements = useMemo(() => {
    let result = budgetStatements
    if (selectedStatuses && selectedStatuses.length > 0) {
      result = result.filter((statement) => {
        return selectedStatuses.includes(statement.status)
      })
    }

    if (sortOption && result.length > 0) {
      const sortFn = SORTERS[sortOption]
      return [...result].sort(sortFn)
    }

    return result
  }, [budgetStatements, selectedStatuses, sortOption])

  return {
    processedBudgetStatements,
  }
}
