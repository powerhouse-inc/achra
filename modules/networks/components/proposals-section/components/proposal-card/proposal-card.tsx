import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import {
  StripedCard,
  StripedCardAction,
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
      <StripedCardHeader className="grid-cols-[auto_auto] items-center py-0.5 pr-2">
        <StripedCardTitle>{title}</StripedCardTitle>
        <StripedCardAction>
          <Button variant="ghost" asChild>
            <Link href={detailsHref}>
              Details
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </StripedCardAction>
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
