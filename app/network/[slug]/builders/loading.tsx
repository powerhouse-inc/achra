import BuilderFiltersSkeleton from '@/modules/builders/components/builder-filters/builder-filters-skeleton'
import { BreadcrumbSkeleton, PageBreadcrumbContainer } from '@/modules/shared/components/breadcrumb'
import { PageBackground, PageContent } from '@/modules/shared/components/page-containers'

export default function BuildersLoading() {
  return (
    <PageBackground>
      <PageBreadcrumbContainer>
        <BreadcrumbSkeleton segments={3} />
      </PageBreadcrumbContainer>
      <PageContent variant="with-breadcrumb" className="gap-6">
        <BuilderFiltersSkeleton />
        Loading...
      </PageContent>
    </PageBackground>
  )
}
