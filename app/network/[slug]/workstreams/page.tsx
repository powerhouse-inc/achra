import { Suspense } from 'react'
import { PageBackground, PageContent } from '@/modules/shared/components/page-containers'
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
      <PageContent>
        <WorkstreamBanner network={slug} />

        <div className="flex flex-col gap-8">
          <Suspense fallback={<WorkstreamFiltersSkeleton showNetworkFilter={false} />}>
            <WorkstreamFilters showNetworkFilter={false} />
          </Suspense>

          <div className="flex flex-col gap-8">
            <WorkstreamCard slug={slug} workstreamSlug="vetra-beta-launch" />
            <WorkstreamCard slug={slug} workstreamSlug="vetra-beta-launch" />
            <WorkstreamCard slug={slug} workstreamSlug="vetra-beta-launch" />
          </div>
        </div>
      </PageContent>
    </PageBackground>
  )
}
