import { ProjectCardItemSkeleton } from '@/modules/project/components/project-card-item/skeletons/project-card-item-skeleton'
import { BreadcrumbSkeleton, PageBreadcrumbContainer } from '@/modules/shared/components/breadcrumb'
import { PageContent } from '@/modules/shared/components/page-containers'

export default function Loading() {
  return (
    <main>
      <PageBreadcrumbContainer>
        <BreadcrumbSkeleton segments={4} />
      </PageBreadcrumbContainer>
      <PageContent className="gap-8" variant="with-breadcrumb">
        <ProjectCardItemSkeleton />
      </PageContent>
    </main>
  )
}
