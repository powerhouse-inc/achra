import { FilePenLine } from 'lucide-react'
import type {
  FullQueryWorkstream,
  Network,
} from '@/modules/__generated__/graphql/switchboard-generated'
import WorkstreamStatusChip from '@/modules/shared/components/chips/workstream-status-chip'
import { InternalLink } from '@/modules/shared/components/internal-link'
import { Markdown } from '@/modules/shared/components/markdown'
import { NavigationHeader } from '@/modules/shared/components/navigation-header'
import { Button } from '@/modules/shared/components/ui/button'
import { Card } from '@/modules/shared/components/ui/card'
import { Separator } from '@/modules/shared/components/ui/separator'
import { slugify } from '@/modules/shared/lib/slug'
import { calculateTotalBudget, countRoadmapStats } from '../../lib/roadmap-stats'
import InitialProposalHeader from '../initial-proposal-header/initial-proposal-header'
import { NoDeliverables } from '../no-deliverables'
import WorkstreamStats from '../workstream-stats/workstream-stats'
import ProposalCardsGrid from './proposal-cards-grid'
import { StatCards } from './stat-cards'
import type { Route } from 'next'

interface WorkstreamCardProps {
  workstream: FullQueryWorkstream
}

export default function WorkstreamCard({ workstream }: WorkstreamCardProps) {
  const networkSlug = slugify(workstream.network?.name ?? 'Unknown')
  const workstreamSlug = workstream.slug ?? 'unknown'

  const { milestones, deliverables } = countRoadmapStats(workstream)
  const totalBudget = calculateTotalBudget(workstream)

  const initialProposalDeliverables = workstream.initialProposal?.sow?.deliverables ?? []

  return (
    <Card className="gap-0 overflow-hidden p-0">
      <div className="flex flex-col gap-4 p-2 sm:gap-6 sm:p-3 sm:pb-2 md:p-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <NavigationHeader
            network={workstream.network as Pick<Network, 'name' | 'logo' | 'darkThemeLogo'>}
            title={workstream.title ?? 'Unknown'}
            workstreamSlug={workstreamSlug}
          />

          {workstream.status && <WorkstreamStatusChip status={workstream.status} />}
        </div>

        <WorkstreamStats
          issuer={workstream.client?.name ?? 'Unknown'}
          budgetMin={workstream.rfp?.budgetMin}
          budgetMax={workstream.rfp?.budgetMax}
          budgetCurrency={workstream.rfp?.budgetCurrency}
          submissionDeadline={workstream.rfp?.submissionDeadline}
        />

        <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
          {workstream.rfp?.summary ? (
            <Markdown className="line-clamp-6 sm:line-clamp-4">{workstream.rfp.summary}</Markdown>
          ) : (
            <div className="text-xs/4.5 sm:text-sm/5.5 xl:text-base/6">No summary available</div>
          )}

          <InternalLink
            href={`/network/${networkSlug}/workstream/${workstreamSlug}/rfp` as Route}
            className="ml-auto max-w-fit"
            variant="outline"
          >
            RFP Details
          </InternalLink>
        </div>
      </div>

      <div className="bg-accent flex flex-col gap-4 border-t border-b p-2 sm:p-3 sm:pb-4 md:p-4 md:pb-6">
        <InitialProposalHeader
          networkSlug={networkSlug}
          workstreamSlug={workstreamSlug}
          proposalStatus={workstream.initialProposal?.status}
          proposalAuthor={workstream.initialProposal?.author.name}
        />

        <StatCards milestones={milestones} deliverables={deliverables} totalBudget={totalBudget} />

        <InternalLink
          href={`/network/${networkSlug}/workstream/${workstreamSlug}/initial-proposal` as Route}
          className="ml-auto max-w-fit sm:hidden"
          variant="outline"
        >
          View Proposal
        </InternalLink>

        <Separator />

        {initialProposalDeliverables.length > 0 ? (
          <>
            <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
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

            {workstream.initialProposal?.sow?.description && (
              <p className="text-xs/4.5 sm:text-sm/5.5 xl:text-base/6">
                {workstream.initialProposal.sow.description}
              </p>
            )}

            <ProposalCardsGrid deliverables={initialProposalDeliverables} />
          </>
        ) : (
          <NoDeliverables />
        )}
      </div>

      {initialProposalDeliverables.length > 0 && (
        <div className="flex flex-col gap-2 p-2 sm:gap-4 sm:p-4">
          <div className="text-sm/5.5 font-semibold sm:text-lg sm:leading-[120%] xl:text-xl xl:font-bold">
            Alternative Proposals
          </div>
          <Button className="w-fit">
            <span>Create Alternative Proposal</span>
            <FilePenLine className="size-4" />
          </Button>
        </div>
      )}
    </Card>
  )
}
