import Link from 'next/link'
import type { Builder } from '@/modules/__generated__/graphql/switchboard-generated'
import {
  StripedCard,
  StripedCardAction,
  StripedCardContent,
  StripedCardHeader,
  StripedCardTitle,
} from '@/modules/shared/components/striped-card/striped-card'
import { Button } from '@/modules/shared/components/ui/button'
import { cn } from '@/modules/shared/lib/utils'
import { BuildersListItems } from './components/builders-list-items/builders-list-items'

export interface BuildersListProps {
  builders: Builder[]
  className?: string
}

export function BuildersList({ className, builders }: BuildersListProps) {
  return (
    <div className={cn('flex w-full flex-col gap-4', className)}>
      <StripedCard className={cn('w-full', className)}>
        <StripedCardHeader className="items-center gap-x-2 px-4">
          <StripedCardTitle className="text-sm leading-5.5 font-semibold sm:text-base/6">
            All Builder teams involved in the Sky Workstreams
          </StripedCardTitle>
          <StripedCardAction className="self-start">
            <Button
              variant="outline"
              size="default"
              asChild
              className="px-3 leading-5"
              aria-label="See more builder teams"
            >
              {/* TODO: replace with the correct link once the target page is created */}
              <Link href="/network/powerhouse/builders" target="_blank">
                See More
                <span className="sr-only">See more builder teams</span>
              </Link>
            </Button>
          </StripedCardAction>
        </StripedCardHeader>
        <StripedCardContent className="p-0">
          <BuildersListItems builders={builders} />
        </StripedCardContent>
      </StripedCard>
    </div>
  )
}
