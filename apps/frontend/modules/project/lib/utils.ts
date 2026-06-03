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

/**
 * Matches the project's deliverable IDs with the master list of deliverables
 * to return the complete objects.
 */
export function resolveProjectDeliverables(
  allDeliverables: ScopeOfWork_Deliverable[] | undefined | null,
  projectIds: string[] | undefined | null,
): ScopeOfWork_Deliverable[] {
  if (!allDeliverables || !projectIds || projectIds.length === 0) return []

  const deliverablesMap = new Map(allDeliverables.map((d) => [d.id, d]))

  return projectIds
    .map((id) => deliverablesMap.get(id))
    .filter((d): d is ScopeOfWork_Deliverable => d !== undefined)
}
