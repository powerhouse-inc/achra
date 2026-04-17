'use client'

import { SearchInput } from '@/modules/shared/components/form/search-input'
import ff from '@/modules/shared/lib/feature-flags'
import { useServicesFiltersContext } from '../services-filters/services-filters-context'

function ServicesMarketplaceHeaderSearch() {
  const { search, isSearchPending, isResetPending, setSearch } = useServicesFiltersContext()
  if (!ff.SERVICES_LISTING_FILTERS_ENABLED) return null

  return (
    <SearchInput
      value={search}
      onChange={setSearch}
      isLoading={isSearchPending}
      disabled={isResetPending}
      showKeyboardShortcut={false}
      placeholder="Search services, tools, and solutions..."
      className="bg-background mt-4 h-10 w-full max-w-lg border"
    />
  )
}

export { ServicesMarketplaceHeaderSearch }
