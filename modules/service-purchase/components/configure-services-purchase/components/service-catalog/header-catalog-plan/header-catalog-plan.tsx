'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { RsServiceOffering } from '@/modules/__generated__/graphql/switchboard-generated'
import { Button } from '@/modules/shared/components/ui/button'
import { RadioGroup } from '@/modules/shared/components/ui/radio-group'
import { cn } from '@/modules/shared/lib/utils'
import { PlanSelectorItem } from '../plan-selector'

interface HeaderCatalogPlanProps {
  selectedPlan?: string
  handlePlanChange: (plan: string) => void
  readOnly?: boolean
  mobilePlanIndex: number
  onPrevPlan: () => void
  onNextPlan: () => void
  servicesData: RsServiceOffering
}

function HeaderCatalogPlan({
  selectedPlan,
  handlePlanChange,
  readOnly = false,
  mobilePlanIndex,
  onPrevPlan,
  onNextPlan,
  servicesData,
}: Readonly<HeaderCatalogPlanProps>) {
  const tiers = servicesData.tiers
  const numTiers = tiers.length
  const currentMobileTier = tiers[mobilePlanIndex]

  return (
    <div
      style={
        {
          '--grid-cols': `4fr repeat(${numTiers}, 1fr)`,
        } as React.CSSProperties
      }
      className={cn(
        'border-input min-h-21 w-full items-center border-b',
        'grid grid-cols-2 lg:grid-cols-[var(--grid-cols)]',
      )}
    >
      {/* LABEL */}
      <div className="flex h-full items-center px-4 lg:px-6">
        <span className="text-muted-foreground text-xs font-bold tracking-wide uppercase lg:text-base">
          SERVICE CATALOG
        </span>
      </div>

      {/* MOBILE CAROUSEL */}
      <div className="bg-primary/10 flex h-full w-full items-center justify-between px-1 lg:hidden">
        <Button variant="ghost" size="icon" onClick={onPrevPlan} className="size-8">
          <ChevronLeft className="size-5" />
        </Button>
        <div className="flex flex-col items-center justify-center">
          <RadioGroup value={selectedPlan} onValueChange={handlePlanChange} disabled={readOnly}>
            <PlanSelectorItem tier={currentMobileTier} />
          </RadioGroup>
        </div>
        <Button variant="ghost" size="icon" onClick={onNextPlan} className="size-8">
          <ChevronRight className="size-5" />
        </Button>
      </div>

      {/* DESKTOP - RADIO GROUP */}
      <RadioGroup
        value={selectedPlan}
        onValueChange={(val: string) => {
          handlePlanChange(val)
        }}
        disabled={readOnly}
        className="hidden lg:contents"
      >
        {tiers.map((tier) => {
          const isActive = selectedPlan === tier.name

          return (
            <div
              key={tier.id}
              className={cn(
                'flex h-full min-w-0 items-center justify-center transition-colors',
                isActive && 'bg-primary/10',
              )}
            >
              <PlanSelectorItem tier={tier} />
            </div>
          )
        })}
      </RadioGroup>
    </div>
  )
}

export { HeaderCatalogPlan }
