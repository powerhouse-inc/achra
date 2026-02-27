'use client'

import {
  RsGroupCostType,
  type RsOfferingOptionGroup,
  type RsServiceSubscriptionTier,
} from '@/modules/__generated__/graphql/switchboard-generated'
import { formatPrice } from '@/modules/service-purchase/lib/utils'
import { usePricingCalculatorContext } from '@/modules/service-purchase/providers/pricing-calculator-provider'
import { cn } from '@/modules/shared/lib/utils'

export interface ServiceCatalogFooterProps {
  optionGroup: RsOfferingOptionGroup
  tiers: readonly RsServiceSubscriptionTier[]
  services?: ReadonlyArray<{ id: string; optionGroupId?: string | null }>
}

function ServiceCatalogFooter({ optionGroup }: Readonly<ServiceCatalogFooterProps>) {
  const { activePlan, tierNames } = usePricingCalculatorContext()
  const isSetup = optionGroup.costType === RsGroupCostType.Setup
  // TODO: Check when the APi is fixed
  // const subtotalValues = useMemo(() => {
  //   if (isSetup) return null
  //   if (optionGroup.isAddOn) {
  //     return computeAddonSubtotals(optionGroup, services ?? [], tiers)
  //   }
  //   return computeRecurringSubtotals(optionGroup, tiers, selectedBillingCycle)
  // }, [isSetup, optionGroup, services, tiers, selectedBillingCycle])

  if (!isSetup) return null

  const setupFeeText =
    optionGroup.price != null
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
        TOTAL SETUP FEE
      </span>

      {/* Mobile: Show setup fee in the single visible column */}
      <div
        className={cn(
          'border-input flex min-h-14 min-w-0 items-center justify-center border-y px-4 lg:hidden',
          !!activePlan && 'bg-primary/10',
        )}
      >
        {setupFeeText && (
          <span className="text-primary text-xs font-medium whitespace-nowrap">{setupFeeText}</span>
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

      {/* SUBTOTAL rows — commented out, replaced by grand total in GrandTotalRowCatalog */}
      {/* Mobile: Show current plan subtotal */}
      {/* <div
        className={cn(
          'border-input flex min-h-14 min-w-0 items-center justify-center border-y px-4 lg:hidden',
          !!activePlan && 'bg-primary/10',
        )}
      >
        <span
          className={cn(
            'text-sm',
            activePlan ? 'text-primary font-bold' : 'text-foreground font-medium',
          )}
        >
          {(activePlan && subtotalValues?.[activePlan]) ?? '—'}
        </span>
      </div> */}

      {/* Desktop: Show per-tier subtotals */}
      {/* {tierNames.map((plan) => {
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
      })} */}
    </div>
  )
}

export { ServiceCatalogFooter }
