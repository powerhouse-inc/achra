import { Suspense } from 'react'
import WorkstreamBanner from '@/modules/workstream/components/banner/workstream-banner'
import WorkstreamFilters from '@/modules/workstream/components/workstream-filters'

export default function WorkstreamsPage() {
  return (
    <main className="container mt-8 mb-8 flex flex-col gap-8">
      <WorkstreamBanner />

      <Suspense fallback={<div>Loading filters...</div>}>
        <WorkstreamFilters />
      </Suspense>
    </main>
  )
}
