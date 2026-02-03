'use client'

import { cn } from '@/modules/shared/lib/utils'
import { usePricingCalculatorContext } from '../service-catalog/pricing-calculator-context'
import { type Plan, PRICING_PLANS, type ServiceSectionCatalog } from '../types'
import { MultiColumnSubtotal, SingleColumnSubtotal } from './components'

interface PricingCatalogSubtotalProps {
  section: ServiceSectionCatalog
  activePlan: Plan
}

export default function PricingCatalogSubtotal({
  section,
  activePlan,
}: Readonly<PricingCatalogSubtotalProps>) {
  const { mobilePlanIndex } = usePricingCalculatorContext()
  const currentMobilePlan = PRICING_PLANS[mobilePlanIndex]
  const { subtotal } = section

  if (!subtotal) return null

  const plansWithValues = PRICING_PLANS.filter((plan) => subtotal.values[plan])
  const isSingleColumnSubtotal = plansWithValues.length === 1

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
          'border-input bg-background text-foreground/50 flex min-h-14 items-center border-y px-4 text-sm font-semibold uppercase lg:px-6 lg:text-base/6',
          // Sticky positioning for mobile
          'sticky left-0 z-10 lg:static',
        )}
      >
        {subtotal.label}
      </span>

      {/* Mobile: Show only current plan */}
      <div
        className={cn(
          'border-input flex min-h-14 min-w-0 items-center justify-center border-y px-4 lg:hidden',
          activePlan === currentMobilePlan && 'bg-primary/10',
        )}
      >
        <span
          className={cn(
            'text-sm',
            activePlan === currentMobilePlan
              ? 'text-primary font-bold'
              : 'text-foreground font-medium',
          )}
        >
          {subtotal.values[currentMobilePlan] || '—'}
        </span>
      </div>

      {/* Desktop: Show subtotal columns */}
      {isSingleColumnSubtotal ? (
        <SingleColumnSubtotal value={subtotal.values[plansWithValues[0]]} activePlan={activePlan} />
      ) : (
        <MultiColumnSubtotal subtotal={subtotal} activePlan={activePlan} />
      )}
    </div>
  )
}
