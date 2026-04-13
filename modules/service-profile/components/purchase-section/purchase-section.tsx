import type { BuilderProfileState } from '@/modules/__generated__/graphql/switchboard-generated'
import { getServicePurchaseUrl } from '@/modules/service-purchase/lib/get-service-purchase-url'
import { OperatorCard } from '@/modules/services/components/operator-card'

interface PurchaseSectionProps {
  operator: BuilderProfileState
  serviceSlug: string
}

function PurchaseSection({ operator, serviceSlug }: PurchaseSectionProps) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg leading-[120%] font-bold">Request a Quote</h2>
      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
        <OperatorCard
          key={operator.name}
          operator={operator}
          configureServicesHref={getServicePurchaseUrl(serviceSlug, { operatorId: operator.id })}
          showMoreInfo
        />
      </div>
    </div>
  )
}

export { PurchaseSection }
