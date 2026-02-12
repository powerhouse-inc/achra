'use client'

import { useMemo } from 'react'
import { cn } from '@/modules/shared/lib/utils'
import { Plan, PRICING_PLANS, type PricingData } from '../types'
import { PRICING_GRID, usePricingCalculatorContext } from './pricing-calculator-context'
import type { SectionId } from '../../../service-purchase-form/service-purchase-form'

interface GrandTotalRowCatalogProps {
  selectedPlan: Plan
  enabledSections?: Record<SectionId, boolean>
  servicesData: PricingData
}

export function GrandTotalRowCatalog({
  selectedPlan,
  enabledSections,
  servicesData,
}: Readonly<GrandTotalRowCatalogProps>) {
  const { currentMobilePlan } = usePricingCalculatorContext()

  const planTotals = useMemo(() => {
    const totals: Record<Plan, string> = {
      [Plan.Basic]: '$0',
      [Plan.Team]: '$0',
      [Plan.Premium]: '$0',
      [Plan.Enterprise]: '$0',
    }

    PRICING_PLANS.forEach((plan) => {
      const tier = servicesData.tiers.find((t) => t.id === plan)
      if (!tier) return

      let total = tier.monthlyPrice

      // Add prices from enabled toggle sections
      servicesData.sections?.forEach((section) => {
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
  }, [enabledSections, servicesData.sections, servicesData.tiers])

  return (
    <div className={cn('grid items-center', PRICING_GRID.responsive)}>
      {/* Label column - sticky on mobile */}
      <span
        className={cn(
          'bg-background text-foreground flex min-h-14 items-center px-4 text-xs font-bold uppercase lg:px-6 lg:text-sm',
          // Sticky positioning for mobile
          'sticky left-0 z-10 lg:static',
        )}
      >
        {servicesData.grandTotal?.label}
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
