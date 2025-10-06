'use client'
import {
  StripedCard,
  StripedCardContent,
  StripedCardHeader,
  StripedCardTitle,
} from '@/modules/shared/components/striped-card/striped-card'
import { cn } from '@/modules/shared/lib/utils'
import { ExecutiveProposalItem } from './components/executive-proposal-item/executive-proposal-item'
import { useExecutiveProposals } from './use-executive-proposals'

interface ExecutiveProposalsProps {
  className?: string
}

export function ExecutiveProposals({ className }: ExecutiveProposalsProps) {
  const { openProposals, activeProposals, passedProposals, slicedPassedProposals, hatAddress } =
    useExecutiveProposals()

  return (
    <div className={cn('flex w-full flex-col gap-4', className)}>
      {openProposals.length > 0 && (
        <StripedCard className={cn('w-full', className)}>
          <StripedCardHeader>
            <StripedCardTitle>Open Executive Proposals</StripedCardTitle>
          </StripedCardHeader>
          <StripedCardContent className="flex flex-col gap-2 text-sm leading-5.5 font-semibold">
            {openProposals.map((executiveProposal) => (
              <ExecutiveProposalItem
                key={executiveProposal.key}
                executiveProposal={executiveProposal}
                isHat={hatAddress === executiveProposal.address}
              />
            ))}
          </StripedCardContent>
        </StripedCard>
      )}
      {activeProposals.length > 0 && (
        <StripedCard className={cn('w-full', className)}>
          <StripedCardHeader>
            <StripedCardTitle>Active Executive Proposals</StripedCardTitle>
          </StripedCardHeader>
          <StripedCardContent className="flex flex-col gap-2 text-sm leading-5.5 font-semibold">
            {activeProposals.map((executiveProposal) => (
              <ExecutiveProposalItem
                key={executiveProposal.key}
                executiveProposal={executiveProposal}
                isHat={hatAddress === executiveProposal.address}
              />
            ))}
          </StripedCardContent>
        </StripedCard>
      )}
      {passedProposals.length > 0 && (
        <StripedCard className={cn('w-full', className)}>
          <StripedCardHeader>
            <StripedCardTitle>Passed Executive Proposals</StripedCardTitle>
          </StripedCardHeader>
          <StripedCardContent className="flex flex-col gap-2 text-sm leading-5.5 font-semibold">
            {slicedPassedProposals.map((executiveProposal) => (
              <ExecutiveProposalItem
                key={executiveProposal.key}
                executiveProposal={executiveProposal}
                isHat={hatAddress === executiveProposal.address}
              />
            ))}
          </StripedCardContent>
        </StripedCard>
      )}
    </div>
  )
}
