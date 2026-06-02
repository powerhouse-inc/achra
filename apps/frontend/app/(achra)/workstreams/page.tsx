import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { ErrorBoundaryWithPresets } from '@/modules/shared/components/error-state'
import { PageContent } from '@/modules/shared/components/page-containers'
import ff from '@/modules/shared/lib/feature-flags'
import { WorkstreamBanner } from '@/modules/workstream/components/banner/workstream-banner'
import { WorkstreamCardSkeleton } from '@/modules/workstream/components/workstream-card/workstream-card-skeleton'
import { WorkstreamFilters } from '@/modules/workstream/components/workstream-filters'
import { WorkstreamFiltersSkeleton } from '@/modules/workstream/components/workstream-filters/workstream-filters-skeleton'
import { WorkstreamServerList } from '@/modules/workstream/components/workstream-server-list/workstream-server-list'
import { WorkstreamServerListSkeleton } from '@/modules/workstream/components/workstream-server-list/workstream-server-list-skeleton'

interface WorkstreamsPageProps {
  searchParams: Promise<{
    search?: string
    networks?: string[]
    statuses?: string[]
  }>
}

export default async function WorkstreamsPage({ searchParams }: WorkstreamsPageProps) {
  if (!ff.workstreams.WORKSTREAMS_ENABLED) {
    return notFound()
  }

  const searchParamsString = JSON.stringify(await searchParams)

  return (
    <PageContent>
      <WorkstreamBanner />

      <div className="flex flex-col gap-8">
        <Suspense fallback={<WorkstreamFiltersSkeleton />}>
          <WorkstreamFilters />
        </Suspense>

        <ErrorBoundaryWithPresets>
          <Suspense
            fallback={
              <WorkstreamServerListSkeleton>
                <WorkstreamCardSkeleton />
                <WorkstreamCardSkeleton />
              </WorkstreamServerListSkeleton>
            }
            key={searchParamsString}
          >
            <WorkstreamServerList searchParams={searchParams} />
          </Suspense>
        </ErrorBoundaryWithPresets>
      </div>
    </PageContent>
  )
}
