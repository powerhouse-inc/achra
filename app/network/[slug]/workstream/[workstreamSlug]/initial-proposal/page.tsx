import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import {
  RoadmapSection,
  RoadmapSectionSkeleton,
} from '@/modules/networks/components/roadmap-section'
import { BreadcrumbSkeleton, PageBreadcrumbContainer } from '@/modules/shared/components/breadcrumb'
import { ErrorBoundaryWithPresets } from '@/modules/shared/components/error-state'
import { PageContent } from '@/modules/shared/components/page-containers'
import ff from '@/modules/shared/lib/feature-flags'
import {
  BudgetingSection,
  BudgetingSectionSkeleton,
} from '@/modules/workstream/components/budgeting-section'
import { InitialProposalList } from '@/modules/workstream/components/initial-proposal-list'
import { WorkstreamInitialProposalBreadcrumb } from '@/modules/workstream/components/workstream-breadcrumb'
import { WorkstreamCardSkeleton } from '@/modules/workstream/components/workstream-card'
import { WorkstreamServerListSkeleton } from '@/modules/workstream/components/workstream-server-list'

interface InitialProposalPageProps {
  params: Promise<{ slug: string; workstreamSlug: string }>
}

export default function InitialProposalPage({ params }: Readonly<InitialProposalPageProps>) {
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
        <Suspense
          fallback={
            <WorkstreamServerListSkeleton>
              <WorkstreamCardSkeleton />
              <WorkstreamCardSkeleton />
            </WorkstreamServerListSkeleton>
          }
        >
          <InitialProposalList params={params} />
        </Suspense>

        <ErrorBoundaryWithPresets description="We ran into an unexpected error while loading the roadmaps. Please try again later.">
          <Suspense fallback={<RoadmapSectionSkeleton />}>
            <RoadmapSection params={params} />
          </Suspense>
        </ErrorBoundaryWithPresets>
        <Suspense fallback={<BudgetingSectionSkeleton />}>
          <BudgetingSection params={params} />
        </Suspense>
      </PageContent>
    </main>
  )
}
