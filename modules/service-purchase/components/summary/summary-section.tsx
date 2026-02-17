import type { RsServiceOffering } from '@/modules/__generated__/graphql/switchboard-generated'
import type { ServiceRequestFormState } from '@/modules/services/config/types'
import { MarketplaceHeader } from '../configure-services-purchase/components/marketplace-header'
import { OperationSummaryCard } from './components/operation-summary-card'
import { Summary } from './components/summary'

export interface SummaryProps {
  selectedPlan?: string
  enabledSections: Record<string, boolean>
  actionState: ServiceRequestFormState
  isPending: boolean
  servicesData?: RsServiceOffering
  isLoading?: boolean
}

function SummarySection({
  selectedPlan,
  enabledSections,
  actionState,
  isPending,
  servicesData,
}: Readonly<SummaryProps>) {
  // Get enabled section IDs (option group IDs)
  const selectedAddons = Object.entries(enabledSections)
    .filter(([, isEnabled]) => isEnabled)
    .map(([sectionId]) => sectionId)

  if (!servicesData) return null

  return (
    <div className="mt-6 flex flex-col gap-6">
      <MarketplaceHeader />
      <Summary actionState={actionState} isPending={isPending} />
      <OperationSummaryCard
        pricingData={servicesData}
        selectedPlan={selectedPlan}
        selectedAddons={selectedAddons}
      />
    </div>
  )
}

export { SummarySection }
