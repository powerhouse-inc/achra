import { OperatorCard } from '@/modules/shared/components/operator-card'
import { OPERATORS_MOCK } from '../../../../service-purchase/components/service-purchase-form/components/select-operator/select-operator'
import type { Route } from 'next'

export function PurchaseSection() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg leading-[120%] font-bold">Purchase</h2>
      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
        {OPERATORS_MOCK.map((operator) => (
          <OperatorCard
            key={operator.name}
            operator={operator}
            configureServicesHref={
              `/services/${operator.id}/purchase?step=configure-services` as Route
            }
            showMoreInfo
          />
        ))}
      </div>
    </div>
  )
}
