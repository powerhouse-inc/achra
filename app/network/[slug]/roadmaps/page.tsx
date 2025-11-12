import { Suspense } from 'react'
import RoadmapFilters from '@/modules/roadmap/components/roadmap-filters'
import RoadmapFiltersSkeleton from '@/modules/roadmap/components/roadmap-filters/roadmap-filters-skeleton'
import { RoadmapSection } from '@/modules/roadmap/components/roadmap-section/roadmap-section'
import { mockedRoadmaps } from '@/modules/roadmap/mocks/roadmap'
import { Breadcrumb, PageBreadcrumbContainer } from '@/modules/shared/components/breadcrumb'
import { PageBackground, PageContent } from '@/modules/shared/components/page-containers'
import { Button } from '@/modules/shared/components/ui/button'
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
      <PageContent variant="with-breadcrumb" className="gap-6">
        <Suspense fallback={<RoadmapFiltersSkeleton />}>
          <RoadmapFilters />
        </Suspense>
        <div className="flex flex-col gap-14">
          {mockedRoadmaps.map((roadmap) => (
            <RoadmapSection key={roadmap.id} roadmap={roadmap} />
          ))}
        </div>
        <Button variant="outline" size="lg" className="-mt-2 w-58 self-center md:mt-0">
          Load More
        </Button>
      </PageContent>
    </PageBackground>
  )
}
