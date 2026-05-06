import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import {
  StripedCard,
  StripedCardContent,
  StripedCardHeader,
  StripedCardTitle,
} from '@/modules/shared/components/striped-card'
import { Button } from '@/modules/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'
import type { Proposal } from '../../proposals-section'

export interface ProposalCardProps extends Proposal {
  className?: string
}

function ProposalCard({
  title,
  budget,
  submissionDeadline,
  detailsHref,
  className,
}: ProposalCardProps) {
  return (
    <StripedCard className={cn('w-full', className)}>
      <StripedCardHeader className="items-center py-1.5 pr-2">
        <StripedCardTitle>{title}</StripedCardTitle>
      </StripedCardHeader>
      <StripedCardContent className="flex flex-col gap-2 text-sm leading-5.5 font-semibold">
        <div className="flex items-center justify-between">
          <span className="text-foreground/50">Budget</span>
          <span className="text-card-foreground">{budget}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-foreground/50">Submission Deadline</span>
          <span className="text-card-foreground">{submissionDeadline}</span>
        </div>
        <Button variant="outline" asChild className="w-fit self-end leading-5">
          <Link href={detailsHref}>
            Details
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </StripedCardContent>
    </StripedCard>
  )
}

export { ProposalCard }
