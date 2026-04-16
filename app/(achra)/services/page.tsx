import { Suspense } from 'react'
import { ServicesFiltersProvider } from '@/modules/services/components/services-filters/services-filters-context'
import {
  ServicesContentSkeleton,
  ServicesListSection,
  ServicesPageSkeleton,
} from '@/modules/services/components/services-page-content'
import { PageContent } from '@/modules/shared/components/page-containers'

export default function ServicesPage() {
  return (
    <PageContent className="gap-6">
      <Suspense fallback={<ServicesPageSkeleton />}>
        <ServicesFiltersProvider>
          <Suspense fallback={<ServicesContentSkeleton />}>
            <ServicesListSection />
          </Suspense>
        </ServicesFiltersProvider>
      </Suspense>
    </PageContent>
  )
}
