'use client'

import { useMemo } from 'react'
import type { RsServiceOffering } from '@/modules/__generated__/graphql/switchboard-generated'
import { computeGrandTotals } from '@/modules/service-purchase/utils/utils'
import { cn } from '@/modules/shared/lib/utils'
import { usePricingCalculatorContext } from '../pricing-calculator-context'

interface GrandTotalRowCatalogProps {
  selectedPlan?: string
  enabledSections?: Record<string, boolean>
  servicesData: RsServiceOffering
}

export function GrandTotalRowCatalog({
  selectedPlan,
  enabledSections,
  servicesData,
}: Readonly<GrandTotalRowCatalogProps>) {
  const { currentMobilePlan, tierNames } = usePricingCalculatorContext()

  const planTotals = useMemo(
    () => computeGrandTotals(servicesData.tiers, servicesData.optionGroups, enabledSections),
    [servicesData.tiers, servicesData.optionGroups, enabledSections],
  )

  return (
    <div
      className={cn('items-center', 'grid grid-cols-2 lg:grid-cols-[var(--grid-cols)]')}
      style={
        {
          '--grid-cols': `4fr repeat(${tierNames.length}, 1fr)`,
        } as React.CSSProperties
      }
    >
      {/* Label column - sticky on mobile */}
      <span
        className={cn(
          'bg-background text-foreground flex min-h-14 items-center px-4 text-xs font-bold uppercase lg:px-6 lg:text-sm',
          'sticky left-0 z-10 lg:static',
        )}
      >
        Grand Total (Recurring)
      </span>

      {/* Mobile: Show only current plan */}
      <div
        className={cn(
          'flex min-h-14 min-w-0 items-center justify-center px-4 transition-colors lg:hidden',
          selectedPlan === currentMobilePlan && 'bg-primary/10',
        )}
      >
        <span
          className={cn(
            'text-sm font-bold',
            selectedPlan === currentMobilePlan ? 'text-primary' : 'text-foreground',
          )}
        >
          {planTotals[currentMobilePlan]}
        </span>
      </div>

      {/* Desktop: Show all plans */}
      {tierNames.map((plan) => {
        const isActive = selectedPlan === plan

        return (
          <div
            key={plan}
            className={cn(
              'hidden min-h-14 min-w-0 items-center justify-center px-6 transition-colors lg:flex',
              isActive && 'bg-primary/10',
            )}
          >
            <span
              className={cn('text-sm font-bold', isActive ? 'text-primary' : 'text-foreground')}
            >
              {planTotals[plan]}
            </span>
          </div>
        )
      })}
    </div>
  )
}
