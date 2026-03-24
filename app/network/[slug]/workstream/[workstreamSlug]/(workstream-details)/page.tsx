import { FilePenLine } from 'lucide-react'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { BreadcrumbSkeleton, PageBreadcrumbContainer } from '@/modules/shared/components/breadcrumb'
import WorkstreamStatusChip from '@/modules/shared/components/chips/workstream-status-chip'
import { InternalLink } from '@/modules/shared/components/internal-link'
import { Markdown } from '@/modules/shared/components/markdown'
import { PageContent } from '@/modules/shared/components/page-containers'
import { Button } from '@/modules/shared/components/ui/button'
import { Separator } from '@/modules/shared/components/ui/separator'
import { Skeleton } from '@/modules/shared/components/ui/skeleton'
import ff from '@/modules/shared/lib/feature-flags'
import { InitialProposalHeader } from '@/modules/workstream/components/initial-proposal-header/initial-proposal-header'
import { NoDeliverables } from '@/modules/workstream/components/no-deliverables'
import { WorkstreamDetailsBreadcrumb } from '@/modules/workstream/components/workstream-breadcrumb'
import { ProposalCardsGrid } from '@/modules/workstream/components/workstream-card/proposal-cards-grid'
import { StatCards } from '@/modules/workstream/components/workstream-card/stat-cards'
import { ViewProposalLink } from '@/modules/workstream/components/workstream-card/view-proposal-link'
import { WorkstreamStats } from '@/modules/workstream/components/workstream-stats/workstream-stats'
import { calculateTotalBudget, countRoadmapStats } from '@/modules/workstream/lib/roadmap-stats'
import { getWorkstreamDetails } from '@/modules/workstream/services/workstream-service'
import type { Route } from 'next'

interface Props {
  params: Promise<{ slug: string; workstreamSlug: string }>
}

export default async function WorkstreamDetailsPage({ params }: Props) {
  if (!ff.workstreams.WORKSTREAMS_ENABLED) {
    return notFound()
  }

  const { slug, workstreamSlug } = await params
  const workstream = await getWorkstreamDetails(slug, workstreamSlug)

  if (!workstream) {
    notFound()
  }

  const { milestones, deliverables } = countRoadmapStats(workstream)
  const totalBudget = calculateTotalBudget(workstream)

  const initialProposalDeliverables = workstream.initialProposal?.sow?.deliverables ?? []
  const projects = workstream.initialProposal?.sow?.projects ?? []

  return (
    <>
      <PageBreadcrumbContainer>
        <Suspense fallback={<BreadcrumbSkeleton segments={2} />}>
          <WorkstreamDetailsBreadcrumb
            networkName={workstream.network?.name ?? 'Unknown'}
            networkSlug={workstream.network?.slug ?? 'Unknown'}
            workstreamName={workstream.title ?? 'Unknown'}
            workstreamSlug={workstreamSlug}
          />
        </Suspense>
      </PageBreadcrumbContainer>

      <PageContent className="gap-6" variant="with-breadcrumb">
        <div className="flex justify-between gap-2 md:items-start">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
            <h1 className="leading-6 font-semibold sm:text-lg sm:leading-[120%] sm:font-bold md:text-xl xl:text-2xl">
              {workstream.title ?? 'Unknown'}
            </h1>
            {workstream.status && <WorkstreamStatusChip status={workstream.status} />}
          </div>
        </div>

        <WorkstreamStats
          issuer={workstream.client?.name ?? 'Unknown'}
          budgetMin={workstream.rfp?.budgetMin}
          budgetMax={workstream.rfp?.budgetMax}
          budgetCurrency={workstream.rfp?.budgetCurrency}
          submissionDeadline={workstream.rfp?.submissionDeadline}
        />

        {workstream.rfp?.summary && <Markdown>{workstream.rfp.summary}</Markdown>}

        <div className="bg-accent flex flex-col gap-4 rounded-xl p-2 pb-4 shadow-sm sm:p-4 sm:pb-6">
          <InitialProposalHeader
            action={
              <InternalLink
                href={`/network/${slug}/workstream/${workstreamSlug}/initial-proposal` as Route}
                variant="outline"
              >
                View Proposal
              </InternalLink>
            }
            proposalStatus={workstream.initialProposal?.status}
            proposalAuthor={workstream.initialProposal?.author.name}
          />

          <StatCards
            milestones={milestones}
            deliverables={deliverables}
            totalBudget={totalBudget}
          />

          <Suspense fallback={<Skeleton className="h-9 w-36" />}>
            <ViewProposalLink networkSlug={slug} workstreamSlug={workstreamSlug} />
          </Suspense>

          <Separator />

          {initialProposalDeliverables.length > 0 ? (
            <>
              <div className="flex flex-col items-start gap-4 sm:flex-row sm:justify-between">
                <div className="flex w-full flex-col gap-2">
                  <div className="text-foreground/50 text-sm/5.5 font-semibold uppercase xl:text-base/6">
                    Join this proposal
                  </div>
                  <div className="flex w-full items-center gap-2 text-sm/5.5 font-semibold sm:w-auto xl:text-base/6">
                    <span className="whitespace-nowrap">Application Deadline:</span>
                    <div className="bg-background w-full rounded-lg border px-3 py-1.5 text-center sm:w-auto">
                      31 SEP 2025
                    </div>
                  </div>
                </div>

                <Button>
                  Create Alternative Proposal <FilePenLine className="size-4" />
                </Button>
              </div>
              {workstream.initialProposal?.sow?.description && (
                <p className="text-xs/4.5 sm:text-sm/5.5 xl:text-base/6">
                  {workstream.initialProposal.sow.description}
                </p>
              )}
              <ProposalCardsGrid
                deliverables={initialProposalDeliverables}
                shouldUsePagination={false}
                projects={projects}
                networkSlug={slug}
                workstreamSlug={workstreamSlug}
              />
            </>
          ) : (
            <NoDeliverables />
          )}
        </div>
      </PageContent>
    </>
  )
}
