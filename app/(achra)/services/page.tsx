import { Suspense } from 'react'
import {
  SearchInputSkeleton,
  ServicesContentSkeleton,
} from '@/modules/services/components/service-skeleton'
import { ServicesFiltersProvider } from '@/modules/services/components/services-filters/services-filters-context'
import {
  ServicesMarketplaceHeaderSearch,
  ServicesMarketplaceHeaderShell,
} from '@/modules/services/components/services-marketplace-header'
import { ServicesListSection } from '@/modules/services/components/services-page-content'
import { PageContent } from '@/modules/shared/components/page-containers'

export default function ServicesPage() {
  return (
    <PageContent className="gap-6">
      <div className="flex flex-col gap-10">
        <ServicesMarketplaceHeaderShell
          searchSlot={
            <Suspense fallback={<SearchInputSkeleton />}>
              <ServicesFiltersProvider>
                <ServicesMarketplaceHeaderSearch />
              </ServicesFiltersProvider>
            </Suspense>
          }
        />
        <Suspense fallback={<ServicesContentSkeleton />}>
          <ServicesFiltersProvider>
            <ServicesListSection />
          </ServicesFiltersProvider>
        </Suspense>
      </div>
    </PageContent>
  )
}
