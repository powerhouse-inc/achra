import type { ScopeOfWork_Deliverable } from '@/modules/__generated__/graphql/switchboard-generated'
import { DeliverableList } from '../deliverable-list/deliverable-list'
import { DeliverableTable } from '../deliverable-table/deliverable-table'

export interface DeliverablesCardProps {
  deliverables: ScopeOfWork_Deliverable[]
}

function DeliverablesCard({ deliverables }: DeliverablesCardProps) {
  return (
    <>
      <DeliverableList deliverables={deliverables} className="flex lg:hidden" />
      <DeliverableTable deliverables={deliverables} className="hidden lg:flex" />
    </>
  )
}

export { DeliverablesCard }
