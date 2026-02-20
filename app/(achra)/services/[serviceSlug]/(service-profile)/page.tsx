import { Suspense } from 'react'
import {
  ServiceProfile,
  ServiceProfileSkeleton,
} from '@/modules/service-profile/components/service-profile'
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
        <Suspense fallback={<ServiceProfileSkeleton />}>
          <ServiceProfile serviceSlug={serviceSlug} />
        </Suspense>
      </ErrorBoundaryWithPresets>
    </PageContent>
  )
}
