import { cacheLife } from 'next/cache'
import { notFound } from 'next/navigation'
import { BuilderProfileHeader } from '@/modules/builder-profile/components/builder-profile-header'
import { getBuilderProfile } from '@/modules/builder-profile/services/builder-profile'
import { getNetworkBySlug } from '@/modules/networks/services/networks-service'
import { PageBreadcrumbContainer } from '@/modules/shared/components/breadcrumb/page-breadcrumb-container'
import { ErrorBoundaryWithPresets } from '@/modules/shared/components/error-state/error-boundry-with-presets'
import { BuilderBreadcrumb } from '../builder-breadcrumb/builder-breadcrumb'

interface SharedBuilderLayoutProps {
  params: Promise<{ slug: string; builderSlug: string }>
}

async function SharedBuilderLayout({ params }: SharedBuilderLayoutProps) {
  'use cache'
  cacheLife('hours')
  const { slug, builderSlug } = await params

  const network = await getNetworkBySlug(slug)
  const networkName = network?.name ?? ''
  const builder = await getBuilderProfile({ slug: builderSlug })

  if (!builder) {
    notFound()
  }

  const builderName = builder.name ?? ''

  return (
    <>
      <PageBreadcrumbContainer>
        <BuilderBreadcrumb
          networkSlug={slug}
          builderSlug={builderSlug}
          networkName={networkName}
          builderName={builderName}
        />
      </PageBreadcrumbContainer>
      <ErrorBoundaryWithPresets>
        <BuilderProfileHeader builder={builder} />
      </ErrorBoundaryWithPresets>
    </>
  )
}

export { SharedBuilderLayout }
