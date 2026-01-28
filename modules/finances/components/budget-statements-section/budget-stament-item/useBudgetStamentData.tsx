import { parseAsArrayOf, parseAsString, useQueryState } from 'nuqs'
import { useMemo } from 'react'
import { compareString } from '../utils'
import type { SortOptionValue } from '../budget-stament-filters/popover-filter-content'
import type { BudgetStatement } from '../type'

interface BuildersStamentProps {
  builders: BudgetStatement[]
  sortOption?: SortOptionValue
}

const SORTERS: Record<SortOptionValue, (a: BudgetStatement, b: BudgetStatement) => number> = {
  reporting_newest: (a, b) => compareString(b.month, a.month),
  reporting_oldest: (a, b) => compareString(a.month, b.month),
  modified_newest: (a, b) => compareString(b.lastModifiedAtUtcIso, a.lastModifiedAtUtcIso),
  modified_oldest: (a, b) => compareString(a.lastModifiedAtUtcIso, b.lastModifiedAtUtcIso),
}

export function useBudgetStamentData({ builders, sortOption }: Readonly<BuildersStamentProps>) {
  const [selectedStatuses] = useQueryState('status', parseAsArrayOf(parseAsString))

  const buildersProcessed = useMemo(() => {
    let result = builders
    if (selectedStatuses && selectedStatuses.length > 0) {
      result = result.filter((builder) => {
        return selectedStatuses.includes(builder.status)
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
