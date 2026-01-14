'use client'

import { useState } from 'react'
import { Card, CardHeader } from '@/modules/shared/components/ui/card'
import { RadioGroup } from '@/modules/shared/components/ui/radio-group'
import { cn } from '@/modules/shared/lib/utils'
import { PRICING_DATA } from '../../mock/mock-data'
import { PlanSelectorItem } from './plan-selector'
import type { PricingPlan } from './types'

export interface PricingCalculatorProps {
  readOnly?: boolean
  showAllPlans?: boolean
}

export function PricingCalculator({
  readOnly = false,
  showAllPlans = true,
}: PricingCalculatorProps = {}) {
  const [selectedPlanState, setSelectedPlanState] = useState<PricingPlan>('team')

  const handlePlanChange = (plan: PricingPlan) => {
    setSelectedPlanState(plan)
  }

  return (
    <Card className="flex flex-col gap-6 border-none! py-0!">
      {/* Header with Plan Selectors */}
      <CardHeader className="grid-rows-none! overflow-hidden p-0!">
        <div
          className={cn(
            'item-center grid h-21',
            showAllPlans ? 'grid-cols-[2fr_repeat(4,1fr)]' : 'grid-cols-[2fr_1fr]',
          )}
        >
          {/* Header cell - takes 2fr (first column) */}
          <div className="flex items-center pl-6">
            <span className="text-muted-foreground text-xs font-bold tracking-wide uppercase">
              SERVICE CATALOG
            </span>
          </div>

          {/* Plan selectors with RadioGroup */}
          <RadioGroup
            value={selectedPlanState}
            onValueChange={(value) => {
              handlePlanChange(value as PricingPlan)
            }}
            className={cn('contents', showAllPlans ? 'col-span-4' : 'col-span-1')}
            disabled={readOnly}
          >
            {showAllPlans
              ? PRICING_DATA.tiers.map((tier) => (
                  <div key={tier.id} className="flex items-center justify-center">
                    <PlanSelectorItem
                      value={tier.id}
                      label={tier.name}
                      description={tier.price}
                      id={tier.id}
                    />
                  </div>
                ))
              : PRICING_DATA.tiers
                  .filter((tier) => tier.id === selectedPlanState)
                  .map((tier) => (
                    <div key={tier.id} className="border-border border-b">
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
      </CardHeader>
    </Card>
  )
}
