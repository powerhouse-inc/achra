import { Suspense } from 'react'
import {
  ServicesListSection,
  ServicesPageContentSkeleton,
} from '@/modules/services/components/services-page-content'
import { PageContent } from '@/modules/shared/components/page-containers'

export default function ServicesPage() {
  return (
    <PageContent className="gap-6">
      <Suspense fallback={<ServicesPageContentSkeleton />}>
        <ServicesListSection />
      </Suspense>
    </PageContent>
  )
}
