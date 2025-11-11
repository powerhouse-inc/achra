import { Suspense } from 'react'
import { BreadcrumbSkeleton } from '@/modules/shared/components/breadcrumb'
import { PageBreadcrumbContainer } from '@/modules/shared/components/breadcrumb/page-breadcrumb-container'
import { YearSelect } from '../year-select'
import { FinancesBreadcrumb } from './finances-breadcrumb'

interface BreadcrumbSelectYearProps {
  params: Promise<{ slug: string }>
}

export function BreadcrumbSelectYear({ params }: BreadcrumbSelectYearProps) {
  return (
    <PageBreadcrumbContainer>
      <div className="flex w-full items-center gap-4">
        <div className="min-w-0 flex-1">
          <Suspense fallback={<BreadcrumbSkeleton segments={2} />}>
            <FinancesBreadcrumb params={params} />
          </Suspense>
        </div>
        <div className="shrink-0">
          <YearSelect />
        </div>
      </div>
    </PageBreadcrumbContainer>
  )
}
