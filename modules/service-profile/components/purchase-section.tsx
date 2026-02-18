import type { BuilderProfile_BuilderProfileState } from '@/modules/__generated__/graphql/switchboard-generated'
import { OperatorCard } from '@/modules/shared/components/operator-card'
import type { Route } from 'next'

interface PurchaseSectionProps {
  operator: BuilderProfile_BuilderProfileState
  docId: string
}

export function PurchaseSection({ operator, docId }: PurchaseSectionProps) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg leading-[120%] font-bold">Purchase</h2>
      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
        <OperatorCard
          key={operator.name}
          operator={operator}
          configureServicesHref={
            `/services/${docId}/purchase?step=configure-services&operatorId=${operator.id}` as Route
          }
          showMoreInfo
        />
      </div>
    </div>
  )
}
