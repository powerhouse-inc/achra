import { BuilderProfileHeaderSkeleton } from '@/modules/builder-profile/components/builder-profile-header'
import { BreadcrumbSkeleton, PageBreadcrumbContainer } from '@/modules/shared/components/breadcrumb'
import { PageContent } from '@/modules/shared/components/page-containers'

function SharedBuilderLayoutSkeleton() {
  return (
    <>
      <PageBreadcrumbContainer>
        <BreadcrumbSkeleton segments={3} />
      </PageBreadcrumbContainer>
      <PageContent variant="with-breadcrumb" className="gap-6">
        <BuilderProfileHeaderSkeleton />
      </PageContent>
    </>
  )
}

export { SharedBuilderLayoutSkeleton }
