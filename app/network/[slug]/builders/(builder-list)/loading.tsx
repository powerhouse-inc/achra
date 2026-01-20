import { BuildersSkeleton } from '@/modules/builders/components/builders/builders-skeleton'
import BuildersFiltersSkeleton from '@/modules/builders/components/builders-filters/builders-filters-skeleton'
import { BuildersHeaderSkeleton } from '@/modules/builders/components/builders-header/builders-header-skeleton'
import { BreadcrumbSkeleton, PageBreadcrumbContainer } from '@/modules/shared/components/breadcrumb'
import { PageBackground, PageContent } from '@/modules/shared/components/page-containers'

export default function BuildersLoading() {
  return (
    <PageBackground>
      <PageBreadcrumbContainer>
        <BreadcrumbSkeleton segments={3} />
      </PageBreadcrumbContainer>
      <PageContent variant="with-breadcrumb" className="gap-6">
        <BuildersHeaderSkeleton />
        <BuildersFiltersSkeleton />
        <BuildersSkeleton />
      </PageContent>
    </PageBackground>
  )
}
