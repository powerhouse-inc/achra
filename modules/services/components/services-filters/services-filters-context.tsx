'use client'

import { createFiltersContext } from '@/modules/shared/lib/create-filters-context'
import useServicesFilters from './use-services-filters'

const { FiltersProvider, useFiltersContext } = createFiltersContext(
  useServicesFilters,
  'ServicesFiltersProvider',
)

export {
  FiltersProvider as ServicesFiltersProvider,
  useFiltersContext as useServicesFiltersContext,
}
