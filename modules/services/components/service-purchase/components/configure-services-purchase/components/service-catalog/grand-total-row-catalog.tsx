'use client'

import { useMemo } from 'react'
import { cn } from '@/modules/shared/lib/utils'
import { PRICING_DATA } from '../../../../mock/mock-data'
import { Plan, PRICING_PLANS } from '../types'
import { usePricingCalculatorContext } from './pricing-calculator-context'
import type { SectionId } from '../../../service-purchase-form/service-purchase-form'

interface GrandTotalRowCatalogProps {
  selectedPlan: Plan
  enabledSections?: Record<SectionId, boolean>
}

export function GrandTotalRowCatalog({
  selectedPlan,
  enabledSections,
}: Readonly<GrandTotalRowCatalogProps>) {
  const { mobilePlanIndex } = usePricingCalculatorContext()
  const currentMobilePlan = PRICING_PLANS[mobilePlanIndex]

  const planTotals = useMemo(() => {
    const totals: Record<Plan, string> = {
      [Plan.Basic]: '$0',
      [Plan.Team]: '$0',
      [Plan.Premium]: '$0',
      [Plan.Enterprise]: '$0',
    }

    PRICING_PLANS.forEach((plan) => {
      const tier = PRICING_DATA.tiers.find((t) => t.id === plan)
      if (!tier) return

      let total = tier.monthlyPrice

      // Add prices from enabled toggle sections
      PRICING_DATA.sections?.forEach((section) => {
        if (section.hasToggle && enabledSections?.[section.id as SectionId]) {
          total += section.price ?? 0
        }
      })

      // Format total - handle "Custom" case for enterprise
      if (plan === Plan.Enterprise && tier.monthlyPrice === 0) {
        totals[plan] = total > 0 ? `$${total}/mo` : 'Custom'
      } else {
        totals[plan] = `$${total}/mo`
      }
    })

    return totals
  }, [enabledSections])

  return (
    <div
      className={cn(
        'grid items-center',
        // Desktop: 5 columns (label + 4 plans)
        'lg:grid-cols-[minmax(0,4fr)_repeat(4,minmax(0,1fr))]',
        // Mobile: 2 columns (sticky label + current plan)
        'grid-cols-[minmax(0,1fr)_minmax(0,1fr)]',
      )}
    >
      {/* Label column - sticky on mobile */}
      <span
        className={cn(
          'bg-background text-foreground flex min-h-14 items-center px-4 text-xs font-bold uppercase lg:px-6 lg:text-sm',
          // Sticky positioning for mobile
          'sticky left-0 z-10 lg:static',
        )}
      >
        {PRICING_DATA.grandTotal?.label}
      </span>

      {/* Mobile: Show only current plan */}
      <div
        className={cn(
          'flex min-h-14 min-w-0 items-center justify-center px-4 transition-colors lg:hidden',
          selectedPlan === currentMobilePlan && 'bg-primary/30 font-bold',
        )}
      >
        <span className="text-sm font-bold lg:text-base">{planTotals[currentMobilePlan]}</span>
      </div>

      {/* Desktop: Show all plans */}
      {PRICING_PLANS.map((plan) => (
        <div
          key={plan}
          className={cn(
            'hidden min-h-14 min-w-0 items-center justify-center px-6 transition-colors lg:flex',
            selectedPlan === plan && 'bg-primary/30 font-bold',
          )}
        >
          <span className="text-base font-bold">{planTotals[plan]}</span>
        </div>
      ))}
    </div>
  )
}
