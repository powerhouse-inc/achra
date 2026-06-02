import {
  StripedCard,
  StripedCardContent,
  StripedCardHeader,
} from '@/modules/shared/components/striped-card/striped-card'
import { ExecutiveProposalItemSkeleton } from '../executive-proposal-item/executive-proposal-item-skeleton'

function ExecutiveProposalsListSkeleton() {
  return (
    <div className="flex w-full flex-col gap-4">
      {/* Open Executive Proposals Section */}
      <StripedCard className="w-full">
        <StripedCardHeader className="h-10" />
        <StripedCardContent className="flex flex-col gap-2">
          <ExecutiveProposalItemSkeleton />
        </StripedCardContent>
      </StripedCard>

      {/* Passed Executive Proposals Section */}
      <StripedCard className="w-full">
        <StripedCardHeader className="h-10" />
        <StripedCardContent className="flex flex-col gap-2">
          <ExecutiveProposalItemSkeleton />
          <ExecutiveProposalItemSkeleton />
          <ExecutiveProposalItemSkeleton />
        </StripedCardContent>
      </StripedCard>
    </div>
  )
}

export { ExecutiveProposalsListSkeleton }
