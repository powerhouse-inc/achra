import type { ScopeOfWork_Project } from '../__generated__/graphql/switchboard-generated'

/**
 * Finds the project that contains the deliverable ID
 * @param deliverableId The ID of the deliverable
 * @param projects The list of projects
 * @returns The project that contains the deliverable ID
 */
export function getProjectByDeliverableId(deliverableId: string, projects: ScopeOfWork_Project[]) {
  return projects.find((project) => project.scope?.deliverables.includes(deliverableId))
}
