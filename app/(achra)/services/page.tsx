import { Suspense } from 'react'
import ServicesFiltersSkeleton from '@/modules/services/components/service-skeleton/service-filter-skeleton'
import ServicesFilters from '@/modules/services/components/services-filters'
import {
  ServicesContentSkeleton,
  ServicesListSection,
} from '@/modules/services/components/services-page-content'
import { ErrorBoundaryWithPresets } from '@/modules/shared/components/error-state'
import { PageContent } from '@/modules/shared/components/page-containers'

export default function ServicesPage() {
  return (
    <PageContent className="gap-6">
      <Suspense fallback={<ServicesFiltersSkeleton />}>
        <ServicesFilters />
      </Suspense>
      <ErrorBoundaryWithPresets>
        <Suspense fallback={<ServicesContentSkeleton />}>
          <ServicesListSection />
        </Suspense>
      </ErrorBoundaryWithPresets>
    </PageContent>
  )
}
