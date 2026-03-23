import { UserCheck } from 'lucide-react'
import type { Maybe, ProposalStatus } from '@/modules/__generated__/graphql/switchboard-generated'
import { ProposalStatusChip } from '@/modules/shared/components/chips/proposal-status-chip'
import type { ReactNode } from 'react'

interface InitialProposalHeaderProps {
  proposalStatus?: Maybe<ProposalStatus>
  proposalAuthor?: Maybe<string>
  action?: ReactNode
}

function InitialProposalHeader({
  proposalStatus,
  proposalAuthor,
  action,
}: InitialProposalHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex w-full flex-col items-center gap-1 sm:items-start sm:gap-2 md:flex-row md:gap-4">
        <div className="flex w-full items-center justify-between gap-2 sm:w-auto sm:gap-1 md:justify-start md:gap-2">
          <div className="text-sm/5.5 font-semibold sm:text-base/6 md:text-lg md:leading-[120%] lg:text-xl lg:font-bold">
            Initial Proposal
          </div>

          {proposalStatus && <ProposalStatusChip status={proposalStatus} />}
        </div>

        {proposalAuthor && (
          <div className="text-foreground/50 flex w-full items-center gap-2 text-xs/4.5 font-medium sm:text-sm/5.5 sm:font-semibold md:w-auto md:text-base/6 md:font-normal">
            <span>by</span>
            <UserCheck className="size-4 sm:size-6" />
            <span>{proposalAuthor}</span>
          </div>
        )}
      </div>
      {action && <div className="hidden sm:block">{action}</div>}
    </div>
  )
}

export { InitialProposalHeader }
