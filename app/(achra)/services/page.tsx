import { Suspense } from 'react'
import ServicesFilters from '@/modules/services/components/services-filters'
import { ServicesFiltersProvider } from '@/modules/services/components/services-filters/services-filters-context'
import {
  ServicesContentSkeleton,
  ServicesListSection,
  ServicesPageSkeleton,
} from '@/modules/services/components/services-page-content'
import { ErrorBoundaryWithPresets } from '@/modules/shared/components/error-state'
import { PageContent } from '@/modules/shared/components/page-containers'

export default function ServicesPage() {
  return (
    <PageContent className="gap-6">
      <Suspense fallback={<ServicesPageSkeleton />}>
        <ServicesFiltersProvider>
          <ServicesFilters />
          <ErrorBoundaryWithPresets>
            <Suspense fallback={<ServicesContentSkeleton />}>
              <ServicesListSection />
            </Suspense>
          </ErrorBoundaryWithPresets>
        </ServicesFiltersProvider>
      </Suspense>
    </PageContent>
  )
}
