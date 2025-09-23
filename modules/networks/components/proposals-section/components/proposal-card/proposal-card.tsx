import { ArrowRight } from 'lucide-react'
import {
  StripedCard,
  StripedCardContent,
  StripedCardHeader,
  StripedCardTitle,
} from '@/modules/shared/components/striped-card'
import { Button } from '@/modules/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'
import { useProposalCard } from './use-proposal-card'
import type { Proposal } from '../../proposals-section'

export interface ProposalCardProps extends Proposal {
  className?: string
}

export function ProposalCard({
  title,
  budget,
  deadlineDate,
  experienceLevel,
  detailsHref,
  className,
}: ProposalCardProps) {
  const { handleDetailsClick } = useProposalCard({ detailsHref })

  return (
    <StripedCard className={cn('w-full', className)}>
      <StripedCardHeader className="grid-cols-[auto_auto] items-center gap-0.5">
        <StripedCardTitle>{title}</StripedCardTitle>
        <Button variant="ghost" className="justify-self-end !p-0" onClick={handleDetailsClick}>
          <span className="text-secondary-foreground text-sm leading-5 font-medium">Details</span>
          <ArrowRight className="size-4" />
        </Button>
      </StripedCardHeader>
      <StripedCardContent className="flex flex-col gap-2 pb-4 text-sm leading-5.5 font-semibold">
        <div className="flex items-center justify-between">
          <span className="text-foreground/50">Budget</span>
          <span className="text-foreground">{budget}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-foreground/50">Deadline Date</span>
          <span className="text-foreground">{deadlineDate}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-foreground/50">Experience Level</span>
          <span className="text-destructive">{experienceLevel}</span>
        </div>
      </StripedCardContent>
    </StripedCard>
  )
}
