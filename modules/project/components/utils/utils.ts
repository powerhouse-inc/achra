import type { ScopeOfWork_Deliverable } from '@/modules/__generated__/graphql/switchboard-generated'

interface CalculateTotalBalanceParams {
  deliverables: ScopeOfWork_Deliverable[]
}

export const calculateTotalBalance = ({ deliverables }: CalculateTotalBalanceParams) => {
  const total = deliverables.reduce((acc, deliverable) => {
    return acc + (deliverable.budgetAnchor?.unitCost ?? 0)
  }, 0)
  return total.toLocaleString()
}

export const calculateDeliverableSubtotal = (
  deliverable: ScopeOfWork_Deliverable,
): number | null => {
  const quantity = deliverable.budgetAnchor?.quantity
  const unitCost = deliverable.budgetAnchor?.unitCost
  if (quantity != null && unitCost != null) {
    return quantity * unitCost
  }
  return null
}

export const getDeliverableQuantity = (deliverable: ScopeOfWork_Deliverable): number | null => {
  return deliverable.budgetAnchor?.quantity ?? null
}

export const getDeliverableUnitCost = (deliverable: ScopeOfWork_Deliverable): number | null => {
  return deliverable.budgetAnchor?.unitCost ?? null
}
