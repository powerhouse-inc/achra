import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import {
  BuilderProfileHeader,
  BuilderProfileHeaderSkeleton,
} from '@/modules/builder-profile/components/builder-profile-header'
import { getBuilderProfile } from '@/modules/builder-profile/services/builder-profile'
import { BuilderBreadcrumb } from '@/modules/builders/components/builder-breadcrumb/builder-breadcrumb'
import { getNetworkBySlug } from '@/modules/networks/services/networks-service'
import { BreadcrumbSkeleton } from '@/modules/shared/components/breadcrumb'
import { PageBreadcrumbContainer } from '@/modules/shared/components/breadcrumb/page-breadcrumb-container'

interface BuildersProfileLayoutProps {
  params: Promise<{ slug: string; builderSlug: string }>
  children: React.ReactNode
}
export default async function BuildersProfileLayout({
  params,
  children,
}: BuildersProfileLayoutProps) {
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
        <Suspense fallback={<BreadcrumbSkeleton segments={3} />}>
          <BuilderBreadcrumb
            networkSlug={slug}
            builderSlug={builderSlug}
            networkName={networkName}
            builderName={builderName}
          />
        </Suspense>
      </PageBreadcrumbContainer>

      <Suspense fallback={<BuilderProfileHeaderSkeleton />}>
        <BuilderProfileHeader builder={builder} />
      </Suspense>
      {children}
    </>
  )
}
