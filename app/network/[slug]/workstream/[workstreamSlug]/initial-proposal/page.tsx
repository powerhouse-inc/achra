import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { BreadcrumbSkeleton, PageBreadcrumbContainer } from '@/modules/shared/components/breadcrumb'
import { PageContent } from '@/modules/shared/components/page-containers'
import ff from '@/modules/shared/lib/feature-flags'
import { WorkstreamInitialProposalBreadcrumb } from '@/modules/workstream/components/workstream-breadcrumb'

interface InitialProposalPageProps {
  params: Promise<{ slug: string; workstreamSlug: string }>
}

export default function InitialProposalPage({ params }: InitialProposalPageProps) {
  if (!ff.workstreams.INITIAL_PROPOSAL_ENABLED) {
    return notFound()
  }

  return (
    <main>
      <PageBreadcrumbContainer>
        <Suspense fallback={<BreadcrumbSkeleton segments={3} />}>
          <WorkstreamInitialProposalBreadcrumb params={params} />
        </Suspense>
      </PageBreadcrumbContainer>
      <PageContent className="gap-6" variant="with-breadcrumb">
        <h1 className="text-foreground m-0 text-lg font-bold md:text-xl md:leading-6 xl:text-2xl xl:leading-7">
          Initial Proposal
        </h1>
      </PageContent>
    </main>
  )
}
