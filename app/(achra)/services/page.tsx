import { Suspense } from 'react'
import { ServicesListSection } from '@/modules/services/components/services-page-content'
import { PageContent } from '@/modules/shared/components/page-containers'

export default function ServicesPage() {
  return (
    <PageContent className="gap-6">
      <Suspense fallback={<div>Loadgin</div>}>
        <ServicesListSection />
      </Suspense>
    </PageContent>
  )
}
