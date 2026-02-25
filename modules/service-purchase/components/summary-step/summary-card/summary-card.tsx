'use client'

import { Landmark } from 'lucide-react'
import { useServicePurchaseState } from '@/modules/service-purchase/providers/service-purchase-store-provider'
import { Card, CardContent, CardHeader } from '@/modules/shared/components/ui/card'
import { KeyValueCard } from './key-value-card'
import { OptionGroup } from './option-group'

function SummaryCard() {
  const { facets } = useServicePurchaseState()

  return (
    <Card className="mx-auto w-full max-w-218.5 overflow-hidden border-none p-0!">
      <CardHeader className="flex flex-row items-start justify-between gap-4 px-3 pt-3 lg:px-6 lg:pt-6">
        <div className="flex items-start gap-2">
          <div className="bg-primary flex size-12 shrink-0 items-center justify-center rounded-2xl">
            <Landmark className="text-primary-foreground size-6" strokeWidth={1.5} />
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-foreground text-sm/5.5 leading-tight font-semibold lg:text-lg lg:leading-[120%]">
              Operational Hub for Open Source Builders
            </h2>
            <span className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
              Resource Template
            </span>
          </div>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-0.5">
          <span className="text-primary text-base/6 font-semibold lg:leading-7">$350/mo</span>
          <span className="text-foreground/50 text-xs/4.5 font-medium">+ $3000 Setup</span>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-6 p-0! pb-3! lg:pb-6!">
        {/* Key Information */}
        <div className="bg-accent grid grid-cols-1 gap-2 px-3 py-3 sm:grid-cols-2 md:grid-cols-4 lg:px-6 lg:py-4">
          {facets.map((facet) => (
            <KeyValueCard
              key={facet.originalFacet.id}
              label={facet.originalFacet.categoryLabel}
              value={facet.selectedOption}
            />
          ))}
        </div>

        {/* Pricing Breakdown */}
        <div className="flex flex-col gap-4 px-3 lg:px-6">
          <OptionGroup.Root variant="pricing">
            <OptionGroup.PricingHeader>
              <span className="text-foreground text-sm font-bold tracking-wide uppercase lg:text-base/6">
                PRICING SUMMARY
              </span>
              <span className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                RECURRING
              </span>
            </OptionGroup.PricingHeader>
            <OptionGroup.PricingLineItem label="Core Tools & Documentation" value="$300/mo" />
            <OptionGroup.PricingLineItem label="Advance & Scale" value="$50/mo" />
            <OptionGroup.TotalSetup label="TOTAL RECURRING">$350/mo</OptionGroup.TotalSetup>
          </OptionGroup.Root>
        </div>

        <div className="flex flex-col gap-4 px-3 lg:px-6">
          <OptionGroup.Root variant="pricing">
            <OptionGroup.PricingHeader>
              <span className="text-foreground text-sm font-bold tracking-wide uppercase lg:text-base/6">
                PRICING SUMMARY
              </span>
              <span className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                ONE-TIME FEE
              </span>
            </OptionGroup.PricingHeader>
            <OptionGroup.PricingLineItem label="Legal Setup" value="$3000" />
          </OptionGroup.Root>
        </div>
      </CardContent>
    </Card>
  )
}

export { SummaryCard }
