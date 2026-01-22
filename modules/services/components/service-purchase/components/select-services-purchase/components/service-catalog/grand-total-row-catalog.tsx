import { useMemo } from 'react'
import { cn } from '@/modules/shared/lib/utils'
import { PRICING_DATA } from '../../../../mock/mock-data'
import { Plan } from '../types'
import type { SectionId } from '../../../service-purchase-form/service-purchase-form'

interface GrandTotalRowCatalogProps {
  selectedPlan: Plan
  enabledSections?: Record<SectionId, boolean>
}

export function GrandTotalRowCatalog({
  selectedPlan,
  enabledSections,
}: Readonly<GrandTotalRowCatalogProps>) {
  const planTotals = useMemo(() => {
    const totals: Record<Plan, string> = {
      basic: '$0',
      team: '$0',
      premium: '$0',
      enterprise: '$0',
    }

    const plans: Plan[] = [Plan.Basic, Plan.Team, Plan.Premium, Plan.Enterprise]

    plans.forEach((plan) => {
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
      if (plan === 'enterprise' && tier.monthlyPrice === 0) {
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
        'border-border grid items-stretch gap-4 border px-6',
        'grid-cols-[4fr_repeat(4,1fr)]',
      )}
    >
      <span className="text-foreground flex items-center py-4 text-sm font-bold uppercase">
        {PRICING_DATA.grandTotal?.label}
      </span>

      {([Plan.Basic, Plan.Team, Plan.Premium, Plan.Enterprise] as Plan[]).map((plan) => (
        <div
          key={plan}
          className={cn(
            'flex items-center justify-center transition-colors',
            selectedPlan === plan && 'bg-primary/30 font-bold',
          )}
        >
          <span className="text-base font-bold">{planTotals[plan]}</span>
        </div>
      ))}
    </div>
  )
}
