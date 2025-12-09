import { slugify } from '../shared/lib/slug'
import type {
  ScopeOfWork_Deliverable,
  ScopeOfWork_Project,
} from '../__generated__/graphql/switchboard-generated'

export const formatSlugToTitle = (slug: string): string => {
  if (!slug) return ''

  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

/**
 * Finds a specific project within the list based on the title slug.
 */
// TODO: Remove this function, once the projectSlug from api is ready to filter the project
export function findProjectBySlug(
  projects: ScopeOfWork_Project[] | undefined | null,
  targetSlug: string,
): ScopeOfWork_Project | undefined {
  if (!projects) return undefined

  return projects.find((p) => slugify(p.title) === targetSlug)
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
