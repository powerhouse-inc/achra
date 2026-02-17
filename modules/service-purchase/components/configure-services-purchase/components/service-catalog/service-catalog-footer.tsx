'use client'

import { useMemo } from 'react'
import {
  RsGroupCostType,
  type RsOfferingOptionGroup,
  type RsServiceSubscriptionTier,
} from '@/modules/__generated__/graphql/switchboard-generated'
import { computeRecurringSubtotals, formatPrice } from '@/modules/service-purchase/utils/utils'
import { cn } from '@/modules/shared/lib/utils'
import { usePricingCalculatorContext } from './pricing-calculator-context'
import { useServiceCatalogContext } from './service-catalog-root'

export interface ServiceCatalogFooterProps {
  optionGroup: RsOfferingOptionGroup
  tiers: readonly RsServiceSubscriptionTier[]
}

function ServiceCatalogFooter({ optionGroup, tiers }: Readonly<ServiceCatalogFooterProps>) {
  const { activePlan } = useServiceCatalogContext()
  const { currentMobilePlan, tierNames } = usePricingCalculatorContext()
  const isSetup = optionGroup.costType === RsGroupCostType.Setup

  const subtotalValues = useMemo(
    () => (isSetup ? null : computeRecurringSubtotals(optionGroup, tiers)),
    [isSetup, optionGroup, tiers],
  )

  const label = isSetup ? 'TOTAL SETUP FEE' : 'SUBTOTAL'
  const setupFeeText =
    isSetup && optionGroup.price != null
      ? `${formatPrice(optionGroup.price, optionGroup.currency)} flat fee (applied to all tiers)`
      : null

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
          'border-input bg-background text-foreground/50 flex min-h-14 items-center border-y px-4 text-xs font-semibold uppercase lg:px-6 lg:text-sm',
          'sticky left-0 z-10 lg:static',
        )}
      >
        {label}
      </span>

      {isSetup ? (
        <>
          {/* Mobile: Show setup fee in the single visible column */}
          <div
            className={cn(
              'border-input flex min-h-14 min-w-0 items-center justify-center border-y px-4 lg:hidden',
              activePlan === currentMobilePlan && 'bg-primary/10',
            )}
          >
            {setupFeeText && (
              <span className="text-primary text-xs font-medium whitespace-nowrap">
                {setupFeeText}
              </span>
            )}
          </div>

          {/* Desktop: Empty columns + fee in last column */}
          {tierNames.map((plan, index) => {
            const isLast = index === tierNames.length - 1
            return (
              <div
                key={plan}
                className={cn(
                  'border-input hidden min-h-14 min-w-0 items-center border-y px-6 lg:flex',
                  activePlan === plan && 'bg-primary/10',
                  isLast ? 'justify-end' : 'justify-center',
                )}
              >
                {isLast && setupFeeText && (
                  <span className="text-primary text-xs font-medium whitespace-nowrap">
                    {setupFeeText}
                  </span>
                )}
              </div>
            )
          })}
        </>
      ) : (
        <>
          {/* Mobile: Show current plan subtotal */}
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
              {subtotalValues?.[currentMobilePlan] ?? '—'}
            </span>
          </div>

          {/* Desktop: Show per-tier subtotals */}
          {tierNames.map((plan) => {
            const isActive = activePlan === plan
            const value = subtotalValues?.[plan]

            return (
              <div
                key={plan}
                className={cn(
                  'border-input hidden min-h-14 min-w-0 items-center justify-center border-y px-6 lg:flex',
                  isActive && 'bg-primary/10',
                )}
              >
                <span
                  className={cn(
                    'text-sm',
                    isActive ? 'text-primary font-bold' : 'text-foreground font-medium',
                  )}
                >
                  {value ?? '—'}
                </span>
              </div>
            )
          })}
        </>
      )}
    </div>
  )
}

export { ServiceCatalogFooter }
