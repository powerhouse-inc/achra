import { BuilderProfileSkeleton } from '@/modules/builder-profile/components/builder-profile/builder-profile-skeleton'
import { BuilderProfileHeaderSkeleton } from '@/modules/builder-profile/components/builder-profile-header'
import { BreadcrumbSkeleton, PageBreadcrumbContainer } from '@/modules/shared/components/breadcrumb'
import { PageBackground, PageContent } from '@/modules/shared/components/page-containers'

export default function BuilderProfileLoading() {
  return (
    <PageBackground>
      <PageBreadcrumbContainer>
        <BreadcrumbSkeleton segments={3} />
      </PageBreadcrumbContainer>
      <PageContent variant="with-breadcrumb" className="gap-6">
        <BuilderProfileHeaderSkeleton />
        <BuilderProfileSkeleton />
      </PageContent>
    </PageBackground>
  )
}
