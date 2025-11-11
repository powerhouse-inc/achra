import { Suspense } from 'react'
import RoadmapFilters from '@/modules/roadmap/components/roadmap-filters'
import RoadmapFiltersSkeleton from '@/modules/roadmap/components/roadmap-filters/workstream-filters-skeleton'
import { Breadcrumb, PageBreadcrumbContainer } from '@/modules/shared/components/breadcrumb'
import { PageBackground, PageContent } from '@/modules/shared/components/page-containers'
import type { Route } from 'next'

const items = [
  { label: 'Networks', href: '/networks' as Route },
  { label: 'Powerhouse', href: '/network/powerhouse' as Route },
  { label: 'Roadmaps', href: '/network/powerhouse/roadmaps' as Route },
]

export default function RoadmapPage() {
  return (
    <PageBackground>
      <PageBreadcrumbContainer>
        <Breadcrumb items={items} />
      </PageBreadcrumbContainer>
      <PageContent variant="with-breadcrumb">
        <Suspense fallback={<RoadmapFiltersSkeleton />}>
          <RoadmapFilters />
        </Suspense>
      </PageContent>
    </PageBackground>
  )
}
