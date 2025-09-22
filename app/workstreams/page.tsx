import { Suspense } from 'react'
import WorkstreamBanner from '@/modules/workstream/components/banner/workstream-banner'
import { WorkstreamCard } from '@/modules/workstream/components/workstream-card'
import WorkstreamFilters from '@/modules/workstream/components/workstream-filters'
import WorkstreamFiltersSkeleton from '@/modules/workstream/components/workstream-filters/workstream-filters-skeleton'

export default function WorkstreamsPage() {
  return (
    <main className="container mt-8 mb-8 flex flex-col gap-8">
      <WorkstreamBanner />

      <Suspense fallback={<WorkstreamFiltersSkeleton />}>
        <WorkstreamFilters />
      </Suspense>

      <div className="flex flex-col gap-8">
        <WorkstreamCard />
        <WorkstreamCard />
        <WorkstreamCard />
      </div>
    </main>
  )
}
