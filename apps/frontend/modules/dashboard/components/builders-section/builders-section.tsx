import { Builders } from '@/modules/builders/components/builders/builders'
import { BuilderFilters } from '@/modules/builders/components/builders-filters'
import { BuildersFiltersProvider } from '@/modules/builders/components/builders-filters/builders-filters-context'
import { ErrorBoundaryWithPresets } from '@/modules/shared/components/error-state/error-boundry-with-presets'
import { StripedCardContent } from '@/modules/shared/components/striped-card'
import { NetworkDashboardSections } from '@/modules/shared/lib/constants'
import { DashboardSectionWrapper } from '../dashboard-section-wrapper'
import type { Route } from 'next'

interface BuildersSectionProps {
  networkSlug: string
  networkName: string
  searchParams: Promise<{
    search?: string
    skills?: string[]
  }>
}

function BuildersSection({ networkSlug, searchParams, networkName }: BuildersSectionProps) {
  return (
    <DashboardSectionWrapper
      id={NetworkDashboardSections.Builders}
      title="Builders"
      hash="builders"
      cardTitle={`All Builder teams involved in the ${networkName} Workstreams`}
      href={`/network/${networkSlug}/builders` as Route}
    >
      <BuildersFiltersProvider>
        <StripedCardContent className="px-2 py-0">
          <BuilderFilters />
        </StripedCardContent>
        <StripedCardContent className="p-0">
          <ErrorBoundaryWithPresets className="mb-2">
            <Builders networkSlug={networkSlug} searchParams={searchParams} asSectionContent />
          </ErrorBoundaryWithPresets>
        </StripedCardContent>
      </BuildersFiltersProvider>
    </DashboardSectionWrapper>
  )
}

export { BuildersSection }
