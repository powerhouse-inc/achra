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
  // TODO: Add lastModified field from API when available
  modified_newest: (a, b) => compareString(b.month, a.month),
  modified_oldest: (a, b) => compareString(a.month, b.month),
}

export function useBudgetStamentData({ builders, sortOption }: Readonly<BuildersStamentProps>) {
  const [selectedStatuses] = useQueryState('status', parseAsArrayOf(parseAsString))

  const buildersProcessed = useMemo(() => {
    const result = builders
    // TODO: Add status filter when status field is available from API
    if (selectedStatuses && selectedStatuses.length > 0) {
      // Status filter temporarily disabled until API provides status field
      // result = result.filter((builder) => {
      //   return selectedStatuses.includes(builder.status ?? '')
      // })
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
