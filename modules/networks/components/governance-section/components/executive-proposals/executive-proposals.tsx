import {
  StripedCard,
  StripedCardContent,
  StripedCardHeader,
  StripedCardTitle,
} from '@/modules/shared/components/striped-card/striped-card'
import { cn } from '@/modules/shared/lib/utils'
import { ExecutiveProposalItem } from './components/executive-proposal-item/executive-proposal-item'
import type Link from 'next/link'

export interface ExecutiveProposal {
  id: string
  description: string
  passedDate: string
  executedDate: string
  badgeText: string
  supporters: number
  skySupport: number
  href: Pick<React.ComponentProps<typeof Link>, 'href'>['href']
}

export interface ExecutiveProposalsProps {
  title: string
  executiveProposals: ExecutiveProposal[]
  className?: string
}

export function ExecutiveProposals({
  title,
  executiveProposals,
  className,
}: ExecutiveProposalsProps) {
  return (
    <StripedCard className={cn('w-full', className)}>
      <StripedCardHeader>
        <StripedCardTitle>{title}</StripedCardTitle>
      </StripedCardHeader>
      <StripedCardContent className="flex flex-col gap-2 text-sm leading-5.5 font-semibold">
        {executiveProposals.map((executiveProposal) => (
          <ExecutiveProposalItem key={executiveProposal.id} executiveProposal={executiveProposal} />
        ))}
      </StripedCardContent>
    </StripedCard>
  )
}
