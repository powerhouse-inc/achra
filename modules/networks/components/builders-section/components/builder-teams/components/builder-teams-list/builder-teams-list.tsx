import Link from 'next/link'
import {
  StripedCard,
  StripedCardAction,
  StripedCardContent,
  StripedCardHeader,
  StripedCardTitle,
} from '@/modules/shared/components/striped-card/striped-card'
import { Button } from '@/modules/shared/components/ui/button'
import { cn } from '@/modules/shared/lib/utils'
import { BuilderTeamsItem } from '../builder-teams-item/builder-teams-item'

export interface ExecutiveProposalsListProps {
  className?: string
}

export function BuilderTeamsList({ className }: ExecutiveProposalsListProps) {
  return (
    <div className={cn('flex w-full flex-col gap-4', className)}>
      <StripedCard className={cn('w-full', className)}>
        <StripedCardHeader className="grid-cols-[auto_auto] items-center px-4">
          <StripedCardTitle>All Builder teams involved in the Sky Workstreams</StripedCardTitle>
          <StripedCardAction className="self-start">
            <Button variant="outline" size="default" asChild>
              {/* TODO: replace with the correct link once the target page is created */}
              <Link href="/" target="_blank">
                See More
              </Link>
            </Button>
          </StripedCardAction>
        </StripedCardHeader>
        <StripedCardContent className="flex flex-col gap-2 text-sm leading-5.5 font-semibold">
          <BuilderTeamsItem />
        </StripedCardContent>
      </StripedCard>
    </div>
  )
}
