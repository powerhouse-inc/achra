import Link from 'next/link'
import { Builders } from '@/modules/builders/components/builders/builders'
import BuilderFilters from '@/modules/builders/components/builders-filters'
import { BuildersFiltersProvider } from '@/modules/builders/components/builders-filters/builders-filters-context'
import { ErrorBoundaryWithPresets } from '@/modules/shared/components/error-state'
import { encodeSectionId } from '@/modules/shared/components/section-activation/section-id-utils'
import { SectionTitle } from '@/modules/shared/components/section-title'
import {
  StripedCard,
  StripedCardAction,
  StripedCardContent,
  StripedCardHeader,
  StripedCardTitle,
} from '@/modules/shared/components/striped-card'
import { Button } from '@/modules/shared/components/ui/button'
import { NetworkDashboardSections, SCROLL_MT_CLASSES } from '@/modules/shared/config/constants'
import { cn } from '@/modules/shared/lib/utils'

interface BuildersSectionProps {
  networkSlug: string
  networkName: string
  searchParams: Promise<{
    search?: string
    skills?: string[]
  }>
}

export function BuildersSection({ networkSlug, searchParams, networkName }: BuildersSectionProps) {
  return (
    <section
      className={cn('flex w-full flex-col gap-6', SCROLL_MT_CLASSES)}
      id={encodeSectionId(NetworkDashboardSections.Builders)}
    >
      <SectionTitle title="Builders" hash="builders" />
      <StripedCard className="w-full gap-4">
        <StripedCardHeader className="items-center gap-x-2 px-4">
          <StripedCardTitle className="text-sm leading-5.5 font-semibold sm:text-base/6">
            All Builder teams involved in the {networkName} Workstreams
          </StripedCardTitle>
          <StripedCardAction className="self-start">
            <Button
              variant="outline"
              size="default"
              asChild
              className="px-3 leading-5"
              aria-label="See more builder teams"
            >
              <Link href={`/network/${networkSlug}/builders`}>
                See More
                <span className="sr-only">See more builder teams</span>
              </Link>
            </Button>
          </StripedCardAction>
        </StripedCardHeader>
        <BuildersFiltersProvider>
          <StripedCardContent className="px-2 py-0">
            <BuilderFilters />
          </StripedCardContent>
          <StripedCardContent className="p-0">
            <ErrorBoundaryWithPresets>
              <Builders networkSlug={networkSlug} searchParams={searchParams} asSectionContent />
            </ErrorBoundaryWithPresets>
          </StripedCardContent>
        </BuildersFiltersProvider>
      </StripedCard>
    </section>
  )
}
