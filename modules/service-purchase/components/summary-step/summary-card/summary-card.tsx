'use client'

import { Landmark } from 'lucide-react'
import { useServicePurchaseState } from '@/modules/service-purchase/providers/service-purchase-store-provider'
import { Card, CardContent, CardHeader } from '@/modules/shared/components/ui/card'
import { KeyValueCard } from './key-value-card'
import { OptionGroup } from './option-group'
import { ServiceLineItem } from './service-line-item'
import { SummarySectionHeader } from './summary-section-header'

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
          <span className="text-primary text-base/6 font-semibold lg:leading-7">$550/mo</span>
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

        {/* Tier & Included Services */}
        <div className="flex flex-col gap-4 px-3 lg:px-6">
          <SummarySectionHeader title="Tier & Included Services" />
          <OptionGroup.Root>
            <OptionGroup.Header>
              <OptionGroup.HeaderLeading>
                <OptionGroup.Title>Tier</OptionGroup.Title>
              </OptionGroup.HeaderLeading>
              <OptionGroup.HeaderTrailing>
                <OptionGroup.Value>Team</OptionGroup.Value>
              </OptionGroup.HeaderTrailing>
            </OptionGroup.Header>
            <OptionGroup.PriceIncludes sectionLabel="BASE PRICE" priceLabel="$300/mo">
              <ServiceLineItem label="Legal Setup" value="" valueType="included" icon="lock" />
              <ServiceLineItem label="Needs Analysis" value="" valueType="check" />
              <ServiceLineItem
                label="Incorporation Docs"
                sublabel="One-time fee"
                value="$3000"
                valueType="price"
              />
            </OptionGroup.PriceIncludes>
            <OptionGroup.PriceIncludes sectionLabel="SETUP FEE" priceLabel="$3000">
              <ServiceLineItem
                label="Recurring Operational Service"
                value=""
                valueType="included"
                icon="lock"
              />
              <ServiceLineItem label="Contributor Contracting" value="Up to 6" valueType="text" />
              <ServiceLineItem label="Tax Administration" value="" valueType="check" />
              <ServiceLineItem label="Dedicated Account Manager" value="" valueType="none" />
            </OptionGroup.PriceIncludes>
            <OptionGroup.Subtotal>$300/mo</OptionGroup.Subtotal>
          </OptionGroup.Root>
        </div>

        {/* Selected Add-ons */}
        <div className="flex flex-col gap-4 px-3 lg:px-6">
          <SummarySectionHeader title="Selected Add-ons" />
          <div className="flex flex-col gap-4">
            <OptionGroup.Root>
              <OptionGroup.Header>
                <OptionGroup.HeaderLeading>
                  <OptionGroup.AddOnIcon />
                  <OptionGroup.Title>Finance Pack</OptionGroup.Title>
                </OptionGroup.HeaderLeading>
                <OptionGroup.HeaderTrailing>
                  <OptionGroup.Subtitle>SELECTED</OptionGroup.Subtitle>
                  <OptionGroup.HeaderPrice>+ $50/mo</OptionGroup.HeaderPrice>
                </OptionGroup.HeaderTrailing>
              </OptionGroup.Header>
              <OptionGroup.PriceIncludes>
                <ServiceLineItem label="Needs Analysis" value="" valueType="check" />
                <ServiceLineItem label="Crypto Payment" value="3 Accounts" valueType="label" />
              </OptionGroup.PriceIncludes>
              <OptionGroup.Subtotal>+ $50/mo</OptionGroup.Subtotal>
            </OptionGroup.Root>
            <OptionGroup.Root>
              <OptionGroup.Header>
                <OptionGroup.HeaderLeading>
                  <OptionGroup.AddOnIcon />
                  <OptionGroup.Title>Hosting Suite</OptionGroup.Title>
                </OptionGroup.HeaderLeading>
                <OptionGroup.HeaderTrailing>
                  <OptionGroup.Subtitle>SELECTED</OptionGroup.Subtitle>
                  <OptionGroup.HeaderPrice>+ $200/mo</OptionGroup.HeaderPrice>
                </OptionGroup.HeaderTrailing>
              </OptionGroup.Header>
              <OptionGroup.PriceIncludes>
                <ServiceLineItem label="Secure Email" value="10 Accounts" valueType="label" />
                <ServiceLineItem label="Needs Analysis" value="PRO" valueType="label" />
              </OptionGroup.PriceIncludes>
              <OptionGroup.Subtotal>+ $200/mo</OptionGroup.Subtotal>
            </OptionGroup.Root>
          </div>
        </div>

        {/* Pricing Breakdown */}
        <div className="flex flex-col gap-4 px-3 lg:px-6">
          <SummarySectionHeader title="Pricing Breakdown" />
          <OptionGroup.Root variant="pricing">
            <OptionGroup.PricingHeader>
              <span className="text-foreground text-sm font-bold tracking-wide uppercase lg:text-base/6">
                PRICING SUMMARY
              </span>
              <span className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                RECURRING
              </span>
            </OptionGroup.PricingHeader>
            <OptionGroup.PricingLineItem label="Tier (Team)" value="$300/mo" />
            <OptionGroup.PricingLineItem label="Finance Pack" value="$50/mo" />
            <OptionGroup.PricingLineItem label="Hosting Suite" value="$200/mo" showBorder={false} />
            <OptionGroup.Total label="TOTAL RECURRING">$550/mo</OptionGroup.Total>
            <OptionGroup.OneTimeSection>
              <OptionGroup.PricingLineItem
                label="Incorporation Docs"
                sublabel="One-time fee"
                value="$3000"
              />
            </OptionGroup.OneTimeSection>
            <OptionGroup.TotalSetup label="TOTAL SETUP">$3000</OptionGroup.TotalSetup>
          </OptionGroup.Root>
        </div>
      </CardContent>
    </Card>
  )
}

export { SummaryCard }
