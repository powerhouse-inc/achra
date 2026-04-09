import { PageContent } from '@/modules/shared/components/page-containers'
import { Skeleton } from '@/modules/shared/components/ui/skeleton'
import { WorkstreamCardSkeleton } from '@/modules/workstream/components/workstream-card'
import { WorkstreamFiltersSkeleton } from '@/modules/workstream/components/workstream-filters/workstream-filters-skeleton'
import { WorkstreamServerListSkeleton } from '@/modules/workstream/components/workstream-server-list'

interface WorkstreamPageSkeletonProps {
  showNetworkFilter?: boolean
}
function WorkstreamPageSkeleton({ showNetworkFilter = true }: WorkstreamPageSkeletonProps) {
  return (
    <PageContent>
      <Skeleton className="mb-8 h-55 w-full" />

      <div className="flex flex-col gap-8">
        <WorkstreamFiltersSkeleton showNetworkFilter={showNetworkFilter} />

        <WorkstreamServerListSkeleton>
          <WorkstreamCardSkeleton />
          <WorkstreamCardSkeleton />
        </WorkstreamServerListSkeleton>
      </div>
    </PageContent>
  )
}

export { WorkstreamPageSkeleton }
