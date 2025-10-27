import { UserCheck } from 'lucide-react'
import { ScopeOfWork_DeliverableSetStatus } from '@/modules/__generated__/graphql/switchboard-generated'
import DeliverableSetStatusChip from '@/modules/shared/components/chips/deliverable-set-status-chip/deliverable-set-status-chip'
import { InternalLink } from '@/modules/shared/components/internal-link/internal-link'
import type { Route } from 'next'

interface InitialProposalHeaderProps {
  slug?: string
  workstreamSlug?: string
}

export default function InitialProposalHeader({
  slug,
  workstreamSlug,
}: InitialProposalHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex w-full flex-col items-center gap-1 sm:items-start sm:gap-2 md:flex-row md:gap-4">
        <div className="flex w-full items-center justify-between gap-2 sm:w-auto sm:gap-1 md:justify-start md:gap-2">
          <div className="text-sm/5.5 font-semibold sm:text-base/6 md:text-lg md:leading-[120%] lg:text-xl lg:font-bold">
            Initial Proposal
          </div>
          <DeliverableSetStatusChip status={ScopeOfWork_DeliverableSetStatus.Draft} />
        </div>

        <div className="text-foreground/50 flex w-full items-center gap-2 text-xs/4.5 font-medium sm:text-sm/5.5 sm:font-semibold md:w-auto md:text-base/6 md:font-normal">
          <span>by</span>
          <UserCheck className="size-4 sm:size-6" />
          <span>Powerhouse RGH Team</span>
        </div>
      </div>
      <InternalLink
        href={`/network/${slug}/workstream/${workstreamSlug}/initial-proposal` as Route}
        className="hidden sm:inline-flex sm:self-start"
        variant="outline"
      >
        View Proposal
      </InternalLink>
    </div>
  )
}
