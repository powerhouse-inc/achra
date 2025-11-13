import { Suspense } from 'react'
import RoadmapFilters from '@/modules/roadmap/components/roadmap-filters'
import { Breadcrumb, PageBreadcrumbContainer } from '@/modules/shared/components/breadcrumb'
import { ErrorBoundaryWithPresets } from '@/modules/shared/components/error-state'
import { PageBackground, PageContent } from '@/modules/shared/components/page-containers'
import { RoadmapList } from './comp'
import type { Route } from 'next'

const items = [
  { label: 'Networks', href: '/networks' as Route },
  { label: 'Powerhouse', href: '/network/powerhouse' as Route },
  { label: 'Roadmaps', href: '/network/powerhouse/roadmaps' as Route },
]

interface RoadmapPageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{
    search: string
    statuses: string
  }>
}

export default async function RoadmapPage({ params, searchParams }: RoadmapPageProps) {
  const searchParamsString = JSON.stringify(await searchParams)

  return (
    <PageBackground>
      <PageBreadcrumbContainer>
        <Breadcrumb items={items} />
      </PageBreadcrumbContainer>
      <PageContent variant="with-breadcrumb" className="gap-6">
        <RoadmapFilters />

        <ErrorBoundaryWithPresets>
          <Suspense fallback={<div>Loading...</div>} key={JSON.stringify(searchParamsString)}>
            <RoadmapList params={params} searchParams={searchParams} />
          </Suspense>
        </ErrorBoundaryWithPresets>
      </PageContent>
    </PageBackground>
  )
}
