import { Suspense } from 'react'
import { ErrorBoundaryWithPresets } from '@/modules/shared/components/error-state'
import { PageBackground, PageContent } from '@/modules/shared/components/page-containers'
import WorkstreamBanner from '@/modules/workstream/components/banner/workstream-banner'
import WorkstreamFilters from '@/modules/workstream/components/workstream-filters'
import WorkstreamFiltersSkeleton from '@/modules/workstream/components/workstream-filters/workstream-filters-skeleton'
import { WorkstreamServerList } from '@/modules/workstream/components/workstream-server-list/workstream-server-list'

interface WorkstreamsPageProps {
  searchParams: Promise<{
    search?: string
    networks?: string[]
    statuses?: string[]
  }>
}

export default async function WorkstreamsPage({ searchParams }: WorkstreamsPageProps) {
  const searchParamsString = JSON.stringify(await searchParams)

  return (
    <PageBackground>
      <PageContent>
        <WorkstreamBanner />

        <div className="flex flex-col gap-8">
          <Suspense fallback={<WorkstreamFiltersSkeleton />}>
            <WorkstreamFilters />
          </Suspense>

          <ErrorBoundaryWithPresets>
            <Suspense fallback={<div>loading...</div>} key={searchParamsString}>
              <WorkstreamServerList searchParams={searchParams} />
            </Suspense>
          </ErrorBoundaryWithPresets>
        </div>
      </PageContent>
    </PageBackground>
  )
}
