'use client'

import { Boxes, Package, Store } from 'lucide-react'
import { SearchInput } from '@/modules/shared/components/form/search-input'
import ff from '@/modules/shared/lib/feature-flags'
import { cn } from '@/modules/shared/lib/utils'
import { useServicesFiltersContext } from '../services-filters/services-filters-context'

function ServicesMarketplaceHeader() {
  const filtersEnabled = ff.SERVICES_LISTING_FILTERS_ENABLED
  const { search, isSearchPending, isResetPending, setSearch } = useServicesFiltersContext()

  return (
    <div className="shadow-primary bg-accent relative overflow-hidden rounded-xl">
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className={cn(
            'bg-primary absolute size-60 rounded-full opacity-30 blur-[75px] transition-all duration-1000 ease-in-out',
            '-top-24 -left-16',
            'sm:-top-16 sm:left-[12%]',
            'lg:left-[18%]',
          )}
        />
        <div
          className={cn(
            'bg-primary absolute size-60 rounded-full opacity-40 blur-[60px] transition-all duration-1000 ease-in-out',
            '-right-16 -bottom-24',
            'sm:right-[10%] sm:-bottom-20',
            'lg:right-[18%]',
          )}
        />
        <div
          className={cn(
            'bg-primary absolute hidden size-28 rounded-full opacity-50 blur-[50px] transition-all duration-1000 ease-in-out',
            'sm:top-[10%] sm:right-[6%] sm:block',
            'lg:top-[20%] lg:right-[8%]',
          )}
        />
        <div
          className={cn(
            'bg-primary absolute hidden size-24 rounded-full opacity-40 blur-[50px] transition-all duration-1000 ease-in-out',
            'sm:bottom-[12%] sm:left-[6%] sm:block',
            'lg:bottom-[18%] lg:left-[8%]',
          )}
        />

        <Store
          className={cn(
            'text-border absolute size-24 rotate-[14deg] transition-all duration-500 ease-in-out',
            '-top-4 -left-4',
            'sm:top-2 sm:left-[4%]',
            'lg:top-4 lg:left-[8%]',
          )}
          aria-hidden="true"
        />
        <Package
          className={cn(
            'text-muted-foreground/40 absolute size-32 -rotate-[14deg] transition-all duration-500 ease-in-out',
            '-right-6 -bottom-6',
            'sm:right-[4%] sm:bottom-1',
            'lg:right-[8%] lg:bottom-3',
          )}
          aria-hidden="true"
        />
        <Boxes
          className={cn(
            'text-muted-foreground/40 absolute hidden size-20 rotate-[-10deg] transition-all duration-500 ease-in-out',
            'sm:top-4 sm:right-[10%] sm:block',
            'lg:top-6 lg:right-[14%]',
          )}
          aria-hidden="true"
        />
        <Boxes
          className={cn(
            'text-border absolute hidden size-20 rotate-[10deg] transition-all duration-500 ease-in-out',
            'sm:bottom-4 sm:left-[10%] sm:block',
            'lg:bottom-6 lg:left-[14%]',
          )}
          aria-hidden="true"
        />

        <div className="border-accent bg-secondary/40 absolute inset-0 rounded-xl border-[3px] backdrop-blur-[2px] transition-all duration-300 ease-in-out" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-4 px-4 py-14 text-center">
        <h1 className="text-foreground text-2xl font-bold sm:text-3xl lg:text-4xl">
          Services Marketplace
        </h1>
        <p className="text-foreground max-w-xl text-sm sm:text-base">
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
            className="bg-background mt-4 h-10 w-full max-w-lg border"
          />
        )}
      </div>
    </div>
  )
}

export { ServicesMarketplaceHeader }
