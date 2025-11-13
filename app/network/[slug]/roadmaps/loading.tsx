import RoadmapFiltersSkeleton from '@/modules/roadmap/components/roadmap-filters/roadmap-filters-skeleton'
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

        <div>Loading (loading.tsx)...</div>
      </PageContent>
    </PageBackground>
  )
}
