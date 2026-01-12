import { Suspense } from 'react'
import BuilderProfile from '@/modules/builder-profile/components/builder-profile/builder-profile'
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
        {/* TODO: implement the missing skeletons components for the builder profile page */}
        <Suspense fallback={<div>Loading...</div>}>
          <BuilderProfile builderSlug={builderSlug} />
        </Suspense>
      </ErrorBoundaryWithPresets>
    </PageContent>
  )
}
