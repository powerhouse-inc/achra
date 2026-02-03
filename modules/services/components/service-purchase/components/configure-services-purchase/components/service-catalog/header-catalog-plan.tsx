'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/modules/shared/components/ui/button'
import { RadioGroup } from '@/modules/shared/components/ui/radio-group'
import { cn } from '@/modules/shared/lib/utils'
import { PRICING_DATA } from '../../../../mock/mock-data'
import { type Plan, PRICING_PLANS } from '../types'
import { PlanSelectorItem } from './plan-selector'

interface HeaderCatalogPlanProps {
  selectedPlan?: Plan
  handlePlanChange: (plan: Plan) => void
  readOnly?: boolean
  mobilePlanIndex: number
  onPrevPlan: () => void
  onNextPlan: () => void
}

export default function HeaderCatalogPlan({
  selectedPlan,
  handlePlanChange,
  readOnly = false,
  mobilePlanIndex,
  onPrevPlan,
  onNextPlan,
}: Readonly<HeaderCatalogPlanProps>) {
  const currentMobilePlan = PRICING_PLANS[mobilePlanIndex]
  const currentMobileTier = PRICING_DATA.tiers.find((t) => t.id === currentMobilePlan)

  return (
    <div
      className={cn(
        'border-input grid h-21 items-center border-b',
        // Desktop: 5 columns (label + 4 plans)
        'lg:grid-cols-[minmax(0,4fr)_repeat(4,minmax(0,1fr))]',
        // Mobile/Tablet: 2 columns (label + carousel)
        'grid-cols-[1fr_1fr]',
      )}
    >
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
        {PRICING_DATA.tiers.map((tier) => (
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
