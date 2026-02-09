import Link from 'next/link'
import { encodeSectionId } from '@/modules/shared/components/section-activation'
import { SectionTitle } from '@/modules/shared/components/section-title'
import {
  StripedCard,
  StripedCardAction,
  StripedCardHeader,
  StripedCardTitle,
} from '@/modules/shared/components/striped-card'
import { Button } from '@/modules/shared/components/ui/button'
import { type NetworkDashboardSections, SCROLL_MT_CLASSES } from '@/modules/shared/config/constants'
import { cn } from '@/modules/shared/lib/utils'
import type { Route } from 'next'

interface DashboardSectionWrapperProps {
  id: NetworkDashboardSections
  title: string
  hash: string
  cardTitle: string
  href: Route
  children: React.ReactNode
}

export function DashboardSectionWrapper({
  id,
  title,
  hash,
  cardTitle,
  href,
  children,
}: DashboardSectionWrapperProps) {
  return (
    <section
      className={cn('flex w-full flex-col gap-6', SCROLL_MT_CLASSES)}
      id={encodeSectionId(id)}
    >
      <SectionTitle title={title} hash={hash} />
      <StripedCard className="w-full gap-4">
        <StripedCardHeader className="items-center gap-x-2 px-4">
          <StripedCardTitle className="text-sm leading-5.5 font-semibold sm:text-base/6">
            {cardTitle}
          </StripedCardTitle>
          <StripedCardAction className="self-start">
            <Button
              variant="outline"
              size="default"
              asChild
              className="px-3 leading-5"
              aria-label={`See more ${title}`}
            >
              <Link href={href}>
                See More
                <span className="sr-only">See more {title}</span>
              </Link>
            </Button>
          </StripedCardAction>
        </StripedCardHeader>
        {children}
      </StripedCard>
    </section>
  )
}
