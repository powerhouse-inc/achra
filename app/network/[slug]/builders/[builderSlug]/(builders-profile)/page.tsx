import { Suspense } from 'react'
import BuilderProfile from '@/modules/builder-profile/components/builder-profile/builder-profile'
import { BuilderProfileSkeleton } from '@/modules/builder-profile/components/builder-profile/builder-profile-skeleton'
import { ErrorBoundaryWithPresets } from '@/modules/shared/components/error-state/error-boundry-with-presets'
import { PageContent } from '@/modules/shared/components/page-containers'

interface BuildersProfilePageProps {
  params: Promise<{ builderSlug: string }>
}

export default async function BuildersProfilePage({ params }: BuildersProfilePageProps) {
  const { builderSlug } = await params

  return (
    <PageContent className="mt-3 sm:mt-4">
      <ErrorBoundaryWithPresets>
        <Suspense fallback={<BuilderProfileSkeleton />}>
          <BuilderProfile builderSlug={builderSlug} />
        </Suspense>
      </ErrorBoundaryWithPresets>
    </PageContent>
  )
}
