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
    <div className="border-input border-t border-b">
      <div className="grid grid-cols-[minmax(0,4fr)_repeat(4,minmax(0,1fr))] items-center">
        <span className="text-foreground/50 flex h-14 items-center px-6 text-base/6 font-semibold uppercase">
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
