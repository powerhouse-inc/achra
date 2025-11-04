import { Suspense } from 'react'
import { PageBackground, PageContent } from '@/modules/shared/components/page-containers'
import WorkstreamBanner from '@/modules/workstream/components/banner/workstream-banner'
import { WorkstreamCard } from '@/modules/workstream/components/workstream-card'
import WorkstreamFilters from '@/modules/workstream/components/workstream-filters'
import WorkstreamFiltersSkeleton from '@/modules/workstream/components/workstream-filters/workstream-filters-skeleton'

export default function WorkstreamsPage() {
  return (
    <PageBackground>
      <PageContent>
        <WorkstreamBanner />

        <div className="flex flex-col gap-8">
          <Suspense fallback={<WorkstreamFiltersSkeleton />}>
            <WorkstreamFilters />
          </Suspense>

          <div className="flex flex-col gap-8">
            <WorkstreamCard />
            <WorkstreamCard />
          </div>
        </div>
      </PageContent>
    </PageBackground>
  )
}
