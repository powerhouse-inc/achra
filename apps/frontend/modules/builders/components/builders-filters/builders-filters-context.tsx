'use client'

import { createFiltersContext } from '@/modules/shared/lib/create-filters-context'
import { useBuildersFilters } from './use-builders-filters'

const { FiltersProvider, useFiltersContext } = createFiltersContext(
  useBuildersFilters,
  'BuildersFiltersProvider',
)

export {
  FiltersProvider as BuildersFiltersProvider,
  useFiltersContext as useBuildersFiltersContext,
}
