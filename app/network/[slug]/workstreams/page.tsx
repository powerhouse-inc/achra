import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { getNetworkBySlug } from '@/modules/networks/services/networks-service'
import { ErrorBoundaryWithPresets } from '@/modules/shared/components/error-state'
import { PageBackground, PageContent } from '@/modules/shared/components/page-containers'
import ff from '@/modules/shared/lib/feature-flags'
import WorkstreamBanner from '@/modules/workstream/components/banner/workstream-banner'
import { WorkstreamCardSkeleton } from '@/modules/workstream/components/workstream-card/workstream-card-skeleton'
import WorkstreamFilters from '@/modules/workstream/components/workstream-filters'
import WorkstreamFiltersSkeleton from '@/modules/workstream/components/workstream-filters/workstream-filters-skeleton'
import { WorkstreamServerList } from '@/modules/workstream/components/workstream-server-list/workstream-server-list'
import { WorkstreamServerListSkeleton } from '@/modules/workstream/components/workstream-server-list/workstream-server-list-skeleton'

interface NetworkWorkstreamsPageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{
    search?: string
    networks?: string[]
    statuses?: string[]
  }>
}

export default async function NetworkWorkstreamsPage({
  params,
  searchParams,
}: NetworkWorkstreamsPageProps) {
  if (!ff.WORKSTREAMS_ENABLED) {
    return notFound()
  }

  const searchParamsString = JSON.stringify(await searchParams)
  const { slug } = await params
  const networkProfile = await getNetworkBySlug(slug)

  return (
    <PageBackground>
      <PageContent>
        <Suspense>
          <WorkstreamBanner backgroundImage={networkProfile?.logoBig ?? undefined} />
        </Suspense>

        <div className="flex flex-col gap-8">
          <Suspense fallback={<WorkstreamFiltersSkeleton showNetworkFilter={false} />}>
            <WorkstreamFilters showNetworkFilter={false} />
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
              <WorkstreamServerList params={params} searchParams={searchParams} />
            </Suspense>
          </ErrorBoundaryWithPresets>
        </div>
      </PageContent>
    </PageBackground>
  )
}
