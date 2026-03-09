import { LinkIcon } from 'lucide-react'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { BreadcrumbSkeleton, PageBreadcrumbContainer } from '@/modules/shared/components/breadcrumb'
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
        <h1 className="text-foreground m-0 text-lg font-bold md:text-xl md:leading-6 xl:text-2xl xl:leading-7">
          Initial Proposal
        </h1>
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
        <div className="flex items-center gap-2">
          <h1 className="text-foreground text-xl leading-[1.2] font-bold sm:text-2xl md:text-3xl">
            Roadmaps
          </h1>
          <LinkIcon className="text-foreground/50 size-5 md:size-6" />
        </div>
        <Suspense fallback={<BudgetingSectionSkeleton />}>
          <BudgetingSection params={params} />
        </Suspense>
      </PageContent>
    </main>
  )
}
