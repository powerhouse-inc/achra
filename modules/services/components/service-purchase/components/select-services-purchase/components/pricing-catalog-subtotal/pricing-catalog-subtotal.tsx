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
  const { subtotal } = section

  if (!subtotal) return null

  const plansWithValues = PRICING_PLANS.filter((plan) => subtotal.values[plan])
  const isSingleColumnSubtotal = plansWithValues.length === 1

  return (
    <div className="border-t px-6">
      <div className="grid grid-cols-[4fr_repeat(4,1fr)] items-center gap-4">
        <span className="text-foreground/50 text-base/6 font-semibold uppercase">
          {subtotal.label}
        </span>

        {isSingleColumnSubtotal ? (
          <SingleColumnSubtotal
            value={subtotal.values[plansWithValues[0]]}
            activePlan={activePlan}
          />
        ) : (
          <MultiColumnSubtotal subtotal={subtotal} activePlan={activePlan} />
        )}
      </div>
    </div>
  )
}
