import { Landmark } from 'lucide-react'
import type { ServiceRequestFormState } from '@/modules/services/config/types'
import { Button } from '@/modules/shared/components/ui/button'
import { Card, CardContent, CardHeader } from '@/modules/shared/components/ui/card'
import { PRICING_DATA } from '../../mock/mock-data'
import { MarketplaceHeader } from '../select-services-purchase/components/marketplace-header'
import { LabeledTextField } from './components/labeled-text-field'
import { ServiceBreakdownItem } from './components/service-breakdown-item/service-breakdown-item'
import { Summary } from './components/summary'
import type { Plan } from '../select-services-purchase/components/types'

export interface SummaryProps {
  selectedPlan: Plan
  enabledSections: Record<string, boolean>
  onBack?: () => void
  actionState: ServiceRequestFormState
  isPending: boolean
}

function SummarySection({
  selectedPlan,
  enabledSections,
  onBack,
  actionState,
  isPending,
}: Readonly<SummaryProps>) {
  const currentTier = PRICING_DATA.tiers.find((tier) => tier.id === selectedPlan)
  const basePrice = currentTier?.monthlyPrice ?? 0
  const setupFee = currentTier?.setupFee ?? 0

  // Calculate additional costs from enabled sections
  const selectedAddons = PRICING_DATA.sections
    ?.filter((section) => enabledSections[section.id] && section.price)
    .map((section) => ({
      ...section,
      price: section.price ?? 0,
    }))

  const addonsTotal = selectedAddons?.reduce((acc, section) => acc + section.price, 0) ?? 0
  const recurringTotal = basePrice + addonsTotal

  return (
    <div className="mt-6 flex flex-col gap-6">
      <MarketplaceHeader />
      <Card className="mx-auto w-full max-w-218.5 p-6 py-6!">
        <CardHeader className="flex flex-row items-start justify-between gap-4 p-0! pb-6">
          <div className="flex items-start gap-2">
            <div className="bg-primary flex size-16 items-center justify-center rounded-2xl">
              <Landmark className="text-primary-foreground size-8" />
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-foreground text-xl/6 font-bold">
                Operational Hub for Open Source Builders
              </h2>
              <span className="text-foreground/50 text-xs font-semibold tracking-wider uppercase">
                Selected Resource
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-3">
              <span className="text-primary text-lg/6 font-semibold">${recurringTotal}/mo</span>
            </div>
            <span className="text-foreground/50 text-sm/5.5 font-semibold">
              + ${setupFee.toLocaleString()} Setup
            </span>
          </div>
        </CardHeader>

        <CardContent className="p-0!">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-6">
              <h3 className="text-foreground/50 text-base font-semibold tracking-wider uppercase">
                Configuration
              </h3>
              <div className="flex flex-col gap-4">
                <LabeledTextField label="Legal Entity" value="Swiss Association" />
                <LabeledTextField label="Anonymity Level" value="High (Standard)" />
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <h3 className="text-foreground/50 text-base font-semibold tracking-wider uppercase">
                Service Breakdown
              </h3>
              <div className="flex h-full flex-col gap-4">
                <div className="flex h-16 items-end justify-between">
                  <span className="text-foreground text-sm font-medium">Selected Tier</span>
                  <span className="text-primary text-sm font-bold">{currentTier?.name}</span>
                </div>

                <div className="flex h-full flex-col justify-between">
                  <ServiceBreakdownItem
                    title="Formation & Setup"
                    subtitle="One-time fee"
                    value={`$${setupFee.toLocaleString()}`}
                  />

                  <ServiceBreakdownItem
                    title="Recurring Base"
                    subtitle="Recurring Services"
                    value={`$${basePrice}`}
                  />

                  {selectedAddons?.map((section) => (
                    <ServiceBreakdownItem
                      key={section.id}
                      title={section.title}
                      value={`+$${section.price}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Summary actionState={actionState} isPending={isPending} />
      <div className="mx-auto flex w-full max-w-[874px] justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
      </div>
    </div>
  )
}

export { SummarySection }
