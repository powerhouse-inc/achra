'use client'
import Link from 'next/link'
import SimpleBar from 'simplebar-react'
import { mockBuilderTeams } from '@/modules/networks/mocks/builders-section'
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
import { useBuilderTeamsList } from './use-builder-teams-list'

export interface ExecutiveProposalsListProps {
  className?: string
}

export function BuilderTeamsList({ className }: ExecutiveProposalsListProps) {
  const { simpleBarRef, cardContentRef, itemsWrapperRef } = useBuilderTeamsList({
    mockBuilderTeams,
  })
  return (
    <div className={cn('flex w-full flex-col gap-4', className)}>
      <StripedCard className={cn('w-full', className)}>
        <StripedCardHeader className="items-center justify-between gap-x-2 px-4">
          <StripedCardTitle className="text-sm leading-5.5 font-semibold sm:text-base/6">
            All Builder teams involved in the Sky Workstreams
          </StripedCardTitle>
          <StripedCardAction className="self-start">
            <Button variant="outline" size="default" asChild className="px-3 leading-5">
              {/* TODO: replace with the correct link once the target page is created */}
              <Link href="/network/powerhouse/builders" target="_blank">
                See More
              </Link>
            </Button>
          </StripedCardAction>
        </StripedCardHeader>
        <StripedCardContent ref={cardContentRef} className="p-0">
          <SimpleBar ref={simpleBarRef} autoHide={false}>
            <div ref={itemsWrapperRef} className="flex flex-col gap-2 p-2">
              {mockBuilderTeams.map((team) => (
                <BuilderTeamsItem key={team.id} team={team} />
              ))}
            </div>
          </SimpleBar>
        </StripedCardContent>
      </StripedCard>
    </div>
  )
}

// 210
