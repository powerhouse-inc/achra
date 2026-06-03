import { RoadmapDetailsContentSkeleton } from '@/modules/roadmap/components/roadmap-details-content'
import { BreadcrumbSkeleton } from '@/modules/shared/components/breadcrumb'
import { PageBreadcrumbContainer } from '@/modules/shared/components/breadcrumb/page-breadcrumb-container'
import { PageContent } from '@/modules/shared/components/page-containers/page-content'
import { Skeleton } from '@/modules/shared/components/ui/skeleton'

export default function RoadmapPageLoading() {
  return (
    <main>
      <PageBreadcrumbContainer className="**:data-[slot='page-breadcrumb-container-wrapper']:bg-secondary/20 sm:**:data-[slot='page-breadcrumb-container-wrapper']:bg-background">
        <BreadcrumbSkeleton segments={4} />
      </PageBreadcrumbContainer>

      <PageContent className="gap-6" as="div" variant="with-breadcrumb">
        <div className="flex flex-col">
          <Skeleton className="h-7 w-40 md:h-6 xl:h-7" />
        </div>

        <RoadmapDetailsContentSkeleton />
      </PageContent>
    </main>
  )
}
