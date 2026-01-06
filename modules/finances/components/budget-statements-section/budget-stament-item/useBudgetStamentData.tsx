import { useMemo } from 'react'
import { compareDate, compareString } from '../utils'
import type { SortOptionValue } from '../budget-stament-filters/popover-filter-content'
import type { BudgetStatementExpenseReport } from '../type'

interface BuildersStamentProps {
  builders: BudgetStatementExpenseReport[]
  sortOption?: SortOptionValue
}

const SORTERS: Record<
  SortOptionValue,
  (a: BudgetStatementExpenseReport, b: BudgetStatementExpenseReport) => number
> = {
  reporting_newest: (a, b) => compareString(b.month, a.month),
  reporting_oldest: (a, b) => compareString(a.month, b.month),
  modified_newest: (a, b) => compareDate(b.lastModified, a.lastModified),
  modified_oldest: (a, b) => compareDate(a.lastModified, b.lastModified),
}

export function useBudgetStamentData({ builders, sortOption }: Readonly<BuildersStamentProps>) {
  const buildersProcessed = useMemo(() => {
    if (!sortOption || !builders.length) return builders

    const sortFn = SORTERS[sortOption]

    return [...builders].sort(sortFn)
  }, [builders, sortOption])

  return {
    buildersProcessed,
  }
}
