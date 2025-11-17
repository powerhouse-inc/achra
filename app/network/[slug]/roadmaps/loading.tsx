import RoadmapFiltersSkeleton from '@/modules/roadmap/components/roadmap-filters/roadmap-filters-skeleton'
import { RoadmapsListSkeleton } from '@/modules/roadmap/components/roadmaps-list/roadmaps-list-skeleton'
import { BreadcrumbSkeleton, PageBreadcrumbContainer } from '@/modules/shared/components/breadcrumb'
import { PageBackground, PageContent } from '@/modules/shared/components/page-containers'

export default function RoadmapListLoading() {
  return (
    <PageBackground>
      <PageBreadcrumbContainer>
        <BreadcrumbSkeleton segments={4} />
      </PageBreadcrumbContainer>
      <PageContent variant="with-breadcrumb" className="gap-6">
        <RoadmapFiltersSkeleton />
        <RoadmapsListSkeleton />
      </PageContent>
    </PageBackground>
  )
}
