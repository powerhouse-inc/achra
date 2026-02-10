'use client'

import { createFiltersContext } from '@/modules/shared/lib/create-filters-context'
import useBudgetStamentFilters from './use-budget-stament-filters'

const { FiltersProvider, useFiltersContext } = createFiltersContext(
  useBudgetStamentFilters,
  'BudgetStamentFiltersProvider',
)

export {
  FiltersProvider as BudgetStamentFiltersProvider,
  useFiltersContext as useBudgetStamentFiltersContext,
}
