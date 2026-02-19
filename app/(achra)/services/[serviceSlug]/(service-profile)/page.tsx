import { Suspense } from 'react'
import ServiceProfile from '@/modules/service-profile/service-profile'
import { ErrorBoundaryWithPresets } from '@/modules/shared/components/error-state'
import { PageContent } from '@/modules/shared/components/page-containers'

interface ServiceProfilePageProps {
  params: Promise<{ serviceSlug: string }>
}

export default async function ServiceProfilePage({ params }: ServiceProfilePageProps) {
  const { serviceSlug } = await params

  return (
    <PageContent className="gap-6">
      <ErrorBoundaryWithPresets>
        <Suspense fallback={<span>Loading...</span>}>
          <ServiceProfile serviceSlug={serviceSlug} />
        </Suspense>
      </ErrorBoundaryWithPresets>
    </PageContent>
  )
}
