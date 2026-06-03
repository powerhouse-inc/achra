'use client'

import { createFiltersContext } from '@/modules/shared/lib/create-filters-context'
import { useBudgetStatementFilters } from './use-budget-statement-filters'

const { FiltersProvider, useFiltersContext } = createFiltersContext(
  useBudgetStatementFilters,
  'BudgetStatementFiltersProvider',
)

export {
  FiltersProvider as BudgetStatementFiltersProvider,
  useFiltersContext as useBudgetStatementFiltersContext,
}
