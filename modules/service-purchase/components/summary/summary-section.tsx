import type { ServiceRequestFormState } from '@/modules/services/config/types'
import { MarketplaceHeader } from '../configure-services-purchase/components/marketplace-header'
import { OperationSummaryCard } from './components/operation-summary-card'
import { Summary } from './components/summary'
import type { Plan, PricingData } from '../configure-services-purchase/components/types'

export interface SummaryProps {
  selectedPlan: Plan
  enabledSections: Record<string, boolean>
  actionState: ServiceRequestFormState
  isPending: boolean
  servicesData: PricingData
}

function SummarySection({
  selectedPlan,
  enabledSections,
  actionState,
  isPending,
  servicesData,
}: Readonly<SummaryProps>) {
  // Get selected addon section IDs
  const selectedAddons = Object.entries(enabledSections)
    .filter(([, isEnabled]) => isEnabled)
    .map(([sectionId]) => sectionId)

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
