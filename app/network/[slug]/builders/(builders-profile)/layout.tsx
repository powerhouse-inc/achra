import { Suspense } from 'react'
import { BuilderBreadcrumb } from '@/modules/builders/components/builder-breadcrumb/builder-breadcrumb'
import { BuilderHeader, BuilderHeaderSkeleton } from '@/modules/builders/components/builder-header'
import { BreadcrumbSkeleton } from '@/modules/shared/components/breadcrumb'
import { PageBreadcrumbContainer } from '@/modules/shared/components/breadcrumb/page-breadcrumb-container'

export default function BuildersProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageBreadcrumbContainer>
        <Suspense fallback={<BreadcrumbSkeleton segments={3} />}>
          <BuilderBreadcrumb />
        </Suspense>
      </PageBreadcrumbContainer>

      <Suspense fallback={<BuilderHeaderSkeleton />}>
        <BuilderHeader />
      </Suspense>

      <div className="mt-4">{children}</div>
    </>
  )
}
