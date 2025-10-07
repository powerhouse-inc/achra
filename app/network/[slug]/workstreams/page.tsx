import { Suspense } from 'react'
import { PageBackground } from '@/modules/shared/components/page-background'
import WorkstreamBanner from '@/modules/workstream/components/banner/workstream-banner'
import { WorkstreamCard } from '@/modules/workstream/components/workstream-card'
import WorkstreamFilters from '@/modules/workstream/components/workstream-filters'
import WorkstreamFiltersSkeleton from '@/modules/workstream/components/workstream-filters/workstream-filters-skeleton'

interface NetworkWorkstreamsPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function NetworkWorkstreamsPage({ params }: NetworkWorkstreamsPageProps) {
  const { slug } = await params

  return (
    <PageBackground>
      <main className="container mt-8 mb-8">
        <WorkstreamBanner network={slug} />

        <div className="flex flex-col gap-8">
          <Suspense fallback={<WorkstreamFiltersSkeleton />}>
            <WorkstreamFilters />
          </Suspense>

          <div className="flex flex-col gap-8">
            <WorkstreamCard />
            <WorkstreamCard />
            <WorkstreamCard />
          </div>
        </div>
      </main>
    </PageBackground>
  )
}
