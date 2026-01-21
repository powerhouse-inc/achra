'use client'

import { Landmark } from 'lucide-react'
import type { ServiceRequestFormState } from '@/modules/services/config/types'
import { Button } from '@/modules/shared/components/ui/button'
import { Card, CardContent, CardHeader } from '@/modules/shared/components/ui/card'
import { MarketplaceHeader } from '../../components/select-services-purchase/marketplace-header'
import { LabeledTextField } from './components/labeled-text-field'
import { ServiceBreakdownItem } from './components/service-breakdown-item/service-breakdown-item'
import { Summary } from './components/summary'
import type { PricingPlan } from '../select-services-purchase/types'

const additionalCosts = {
  'finance-pack': 50,
  'hosting-suite': 200,
}
// Mock plan prices
const planPrices: Record<PricingPlan, { monthly: number; setup: number }> = {
  basic: { monthly: 200, setup: 3000 },
  team: { monthly: 300, setup: 3000 },
  premium: { monthly: 500, setup: 3000 },
  enterprise: { monthly: 0, setup: 3000 },
}
// Mock tier names
const tierNames: Record<PricingPlan, string> = {
  basic: 'Basic',
  team: 'Team',
  premium: 'Premium',
  enterprise: 'Enterprise',
}
export interface SummaryProps {
  selectedPlan: PricingPlan
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
  const basePrice = planPrices[selectedPlan].monthly
  const setupFee = planPrices[selectedPlan].setup
  let recurringTotal = basePrice

  // Calculate additional costs from enabled sections improve this API its ready
  Object.entries(enabledSections).forEach(([key, enabled]) => {
    if (enabled && key in additionalCosts) {
      recurringTotal += additionalCosts[key as keyof typeof additionalCosts]
    }
  })

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
                  <span className="text-primary text-sm font-bold">{tierNames[selectedPlan]}</span>
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

                  {enabledSections['finance-pack'] && (
                    <ServiceBreakdownItem
                      title="Finance Pack"
                      value={`+$${additionalCosts['finance-pack']}`}
                    />
                  )}
                  {enabledSections['hosting-suite'] && (
                    <ServiceBreakdownItem
                      title="Hosting Suite"
                      value={`+$${additionalCosts['hosting-suite']}`}
                    />
                  )}
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
