'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/modules/shared/components/ui/button'
import { RadioGroup } from '@/modules/shared/components/ui/radio-group'
import { cn } from '@/modules/shared/lib/utils'
import { type Plan, PRICING_PLANS, type PricingData } from '../types'
import { PlanSelectorItem } from './plan-selector'
import { PRICING_GRID } from './pricing-calculator-context'

interface HeaderCatalogPlanProps {
  selectedPlan?: Plan
  handlePlanChange: (plan: Plan) => void
  readOnly?: boolean
  mobilePlanIndex: number
  onPrevPlan: () => void
  onNextPlan: () => void
  servicesData: PricingData
}

export default function HeaderCatalogPlan({
  selectedPlan,
  handlePlanChange,
  readOnly = false,
  mobilePlanIndex,
  onPrevPlan,
  onNextPlan,
  servicesData,
}: Readonly<HeaderCatalogPlanProps>) {
  const currentMobilePlan = PRICING_PLANS[mobilePlanIndex]
  const currentMobileTier = servicesData.tiers.find((t) => t.id === currentMobilePlan)

  return (
    <div className={cn('border-input grid h-21 items-center border-b', PRICING_GRID.responsive)}>
      {/* SERVICE CATALOG label - visible on all screen sizes */}
      <div className="flex items-center px-6">
        <span className="text-muted-foreground text-xs font-bold tracking-wide uppercase">
          SERVICE CATALOG
        </span>
      </div>

      {/* Mobile/Tablet: Carousel with arrows */}
      <div className="bg-primary/15 flex h-full w-full items-center justify-between px-1 lg:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={onPrevPlan}
          className="size-8"
          aria-label="Previous plan"
        >
          <ChevronLeft className="size-5" />
        </Button>

        <div className="flex flex-col items-center justify-center">
          {currentMobileTier && (
            <RadioGroup
              value={selectedPlan}
              onValueChange={(value) => {
                handlePlanChange(value as Plan)
              }}
              disabled={readOnly}
            >
              <PlanSelectorItem
                value={currentMobileTier.id}
                label={currentMobileTier.name}
                description={currentMobileTier.price}
                id={currentMobileTier.id}
              />
            </RadioGroup>
          )}
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={onNextPlan}
          className="size-8"
          aria-label="Next plan"
        >
          <ChevronRight className="size-5" />
        </Button>
      </div>

      {/* Desktop: All plan selectors */}
      <RadioGroup
        value={selectedPlan}
        onValueChange={(value) => {
          handlePlanChange(value as Plan)
        }}
        className="hidden lg:contents"
        disabled={readOnly}
      >
        {servicesData.tiers.map((tier) => (
          <div
            key={tier.id}
            className={cn(
              'flex h-full min-w-0 items-center justify-center px-6 transition-colors',
              selectedPlan === tier.id && 'bg-primary/10',
            )}
          >
            <PlanSelectorItem
              value={tier.id}
              label={tier.name}
              description={tier.price}
              id={tier.id}
            />
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}
