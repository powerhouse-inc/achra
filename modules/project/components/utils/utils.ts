import type { ScopeOfWork_Deliverable } from '@/modules/__generated__/graphql/switchboard-generated'

export const calculateDeliverableSubtotal = (deliverable: ScopeOfWork_Deliverable): number => {
  const quantity = deliverable.budgetAnchor?.quantity
  const unitCost = deliverable.budgetAnchor?.unitCost
  if (quantity != null && unitCost != null) {
    return quantity * unitCost
  }
  return 0
}

export const getDeliverableQuantity = (deliverable: ScopeOfWork_Deliverable): number | null => {
  return deliverable.budgetAnchor?.quantity ?? null
}

export const getDeliverableUnitCost = (deliverable: ScopeOfWork_Deliverable): number | null => {
  return deliverable.budgetAnchor?.unitCost ?? null
}
