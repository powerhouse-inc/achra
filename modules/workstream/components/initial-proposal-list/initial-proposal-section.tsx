import type { FullProposal } from '@/modules/__generated__/graphql/switchboard-generated'
import type { WorkstreamDetailsProject } from '@/modules/project/types'
import { InternalLink } from '@/modules/shared/components/internal-link'
import { Separator } from '@/modules/shared/components/ui/separator'
import InitialProposalHeader from '../initial-proposal-header/initial-proposal-header'
import { NoDeliverables } from '../no-deliverables'
import ProposalCardsGrid from '../workstream-card/proposal-cards-grid'
import { StatCards } from '../workstream-card/stat-cards'
import { cn } from '@/shared/lib/utils'
import type { Route } from 'next'
import type { ReactNode } from 'react'

interface InitialProposalSectionProps {
  networkSlug: string
  workstreamSlug: string
  proposal?: FullProposal | null
  milestones: number
  deliverables: number
  totalBudget: number
  projects: WorkstreamDetailsProject[]
  action?: ReactNode
  className?: string
}

function InitialProposalSection({
  networkSlug,
  workstreamSlug,
  proposal,
  milestones,
  deliverables,
  totalBudget,
  projects,
  action,
  className,
}: Readonly<InitialProposalSectionProps>) {
  const deliverablesList = proposal?.sow?.deliverables ?? []

  return (
    <div className={cn("bg-accent flex flex-col gap-4 border-b p-2 sm:p-3 sm:pb-4 md:p-4 md:pb-6", className)}>
      <InitialProposalHeader
        proposalStatus={proposal?.status}
        proposalAuthor={proposal?.author.name}
        action={action}
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

      {deliverablesList.length > 0 ? (
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

          {proposal?.sow?.description && (
            <p className="text-xs/4.5 sm:text-sm/5.5 xl:text-base/6">{proposal.sow.description}</p>
          )}

          <ProposalCardsGrid
            deliverables={deliverablesList}
            projects={projects}
            networkSlug={networkSlug}
            workstreamSlug={workstreamSlug}
          />
        </>
      ) : (
        <NoDeliverables />
      )}
    </div>
  )
}

export { InitialProposalSection }
