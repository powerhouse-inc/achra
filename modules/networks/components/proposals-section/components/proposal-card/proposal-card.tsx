import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import {
  StripedCard,
  StripedCardContent,
  StripedCardHeader,
  StripedCardTitle,
} from '@/modules/shared/components/striped-card'
import { cn } from '@/shared/lib/utils'
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
  return (
    <StripedCard className={cn('w-full', className)}>
      <StripedCardHeader className="grid-cols-[auto_auto] items-center gap-0.5">
        <StripedCardTitle>{title}</StripedCardTitle>
        <Link
          href={detailsHref}
          className="flex items-center gap-1 justify-self-end text-gray-700 transition-colors hover:text-gray-900"
        >
          <span className="text-secondary-foreground text-sm leading-5 font-medium">Details</span>
          <ArrowRight className="size-4" />
        </Link>
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
