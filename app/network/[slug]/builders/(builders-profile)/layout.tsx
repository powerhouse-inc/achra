import { Suspense } from 'react'
import { BuilderBreadcrumb } from '@/modules/builders/components/builder-breadcrumb/builder-breadcrumb'
import { BuilderHeader } from '@/modules/builders/components/builder-header'
import { BreadcrumbSkeleton } from '@/modules/shared/components/breadcrumb'
import { PageBreadcrumbContainer } from '@/modules/shared/components/breadcrumb/page-breadcrumb-container'

export default function BuildersProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <PageBreadcrumbContainer>
        <Suspense fallback={<BreadcrumbSkeleton segments={3} />}>
          <BuilderBreadcrumb />
        </Suspense>
      </PageBreadcrumbContainer>

      <Suspense fallback={<div className="mt-14">Loading header...</div>}>
        <BuilderHeader />
      </Suspense>

      <div className="mt-4">{children}</div>
    </div>
  )
}
