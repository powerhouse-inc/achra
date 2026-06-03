import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { getNetworkBySlug } from '@/modules/networks/services/networks-service'
import { RoadmapFilters } from '@/modules/roadmap/components/roadmap-filters'
import { RoadmapList } from '@/modules/roadmap/components/roadmaps-list/roadmap-list'
import { RoadmapsListSkeleton } from '@/modules/roadmap/components/roadmaps-list/roadmaps-list-skeleton'
import { Breadcrumb, PageBreadcrumbContainer } from '@/modules/shared/components/breadcrumb'
import { ErrorBoundaryWithPresets } from '@/modules/shared/components/error-state'
import { PageContent } from '@/modules/shared/components/page-containers'
import ff from '@/modules/shared/lib/feature-flags'
import type { Route } from 'next'

interface RoadmapPageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{
    search: string
    statuses: string[]
  }>
}

export default async function RoadmapPage({ params, searchParams }: RoadmapPageProps) {
  if (!ff.ROADMAPS_ENABLED) {
    return notFound()
  }

  const searchParamsString = JSON.stringify(await searchParams)

  const { slug } = await params

  const networkData = await getNetworkBySlug(slug)

  const networkName = networkData?.name ?? ''

  const items = [
    { label: networkName, href: `/network/${slug}` as Route },
    { label: 'Roadmaps', href: `/network/${slug}/roadmaps` as Route },
  ]

  return (
    <>
      <PageBreadcrumbContainer>
        <Breadcrumb items={items} />
      </PageBreadcrumbContainer>
      <PageContent variant="with-breadcrumb" className="gap-6">
        <RoadmapFilters />
        <ErrorBoundaryWithPresets>
          <Suspense fallback={<RoadmapsListSkeleton />} key={searchParamsString}>
            <RoadmapList params={params} searchParams={searchParams} />
          </Suspense>
        </ErrorBoundaryWithPresets>
      </PageContent>
    </>
  )
}
