import type { ScopeOfWork_Deliverable } from '@/modules/__generated__/graphql/switchboard-generated'
import { useDeliverables } from '../use-deliverables'
import { DeliverableList } from './deliverable-list/deliverable-list'
import { DeliverableTable } from './deliverable-table/deliverable-table'

export interface DeliverablesCardProps {
  deliverables: ScopeOfWork_Deliverable[]
}

export function DeliverablesCard({ deliverables }: DeliverablesCardProps) {
  const { totalBalance } = useDeliverables({ deliverables })

  return (
    <>
      <DeliverableList
        deliverables={deliverables}
        className="flex lg:hidden"
        totalBalance={totalBalance}
      />
      <DeliverableTable deliverables={deliverables} className="hidden lg:flex" />
    </>
  )
}
