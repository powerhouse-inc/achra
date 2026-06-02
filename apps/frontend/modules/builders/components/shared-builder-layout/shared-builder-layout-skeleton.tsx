import { BuilderProfileHeaderSkeleton } from '@/modules/builder-profile/components/builder-profile-header'
import { BreadcrumbSkeleton, PageBreadcrumbContainer } from '@/modules/shared/components/breadcrumb'

function SharedBuilderLayoutSkeleton() {
  return (
    <>
      <PageBreadcrumbContainer>
        <BreadcrumbSkeleton segments={3} />
      </PageBreadcrumbContainer>
      <BuilderProfileHeaderSkeleton />
    </>
  )
}

export { SharedBuilderLayoutSkeleton }
