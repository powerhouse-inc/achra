import { BreadcrumbSkeleton, PageBreadcrumbContainer } from '@/modules/shared/components/breadcrumb'
import { PageContent } from '@/modules/shared/components/page-containers'

export default function Loading() {
  return (
    <main>
      <PageBreadcrumbContainer>
        <BreadcrumbSkeleton segments={4} />
      </PageBreadcrumbContainer>
      <PageContent className="gap-8" variant="with-breadcrumb">
        {/* Improve this loading state */}
        <div>Loading...</div>
      </PageContent>
    </main>
  )
}
