'use client'

import { SearchInput } from '@/modules/shared/components/form/search-input'
import ff from '@/modules/shared/lib/feature-flags'
import { useServicesFiltersContext } from '../services-filters/services-filters-context'

function ServicesMarketplaceHeader() {
  const filtersEnabled = ff.SERVICES_LISTING_FILTERS_ENABLED
  const { search, isSearchPending, isResetPending, setSearch } = useServicesFiltersContext()

  return (
    <div className="bg-accent relative overflow-auto rounded-xl border py-16">
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-foreground text-2xl font-bold sm:text-3xl lg:text-4xl">
          Services Marketplace
        </h1>
        <p className="text-muted-foreground max-w-xl text-sm sm:text-base">
          Find the right tools and services for your organization. From operational hubs to
          compliance frameworks.
        </p>
        {filtersEnabled && (
          <SearchInput
            value={search}
            onChange={setSearch}
            isLoading={isSearchPending}
            disabled={isResetPending}
            showKeyboardShortcut={false}
            placeholder="Search services, tools, and solutions..."
            className="bg-background h-10 w-full max-w-lg border"
          />
        )}
      </div>
    </div>
  )
}

export { ServicesMarketplaceHeader }
