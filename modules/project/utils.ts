import type { ScopeOfWork_Deliverable } from '../__generated__/graphql/switchboard-generated'
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
