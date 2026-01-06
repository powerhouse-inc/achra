import { parseAsArrayOf, parseAsString, useQueryState } from 'nuqs'
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
  const [selectedStatuses] = useQueryState('status', parseAsArrayOf(parseAsString))

  const buildersProcessed = useMemo(() => {
    let result = builders
    if (selectedStatuses && selectedStatuses.length > 0) {
      result = result.filter((builder) => {
        return selectedStatuses.includes(builder.status ?? '')
      })
    }

    if (sortOption && result.length > 0) {
      const sortFn = SORTERS[sortOption]
      return [...result].sort(sortFn)
    }

    return result
  }, [builders, selectedStatuses, sortOption])

  return {
    buildersProcessed,
  }
}
