import type { WorkstreamDetailsProject } from '../project/types'

/**
 * Finds the project that contains the deliverable ID
 * @param deliverableId The ID of the deliverable
 * @param projects The list of projects
 * @returns The project that contains the deliverable ID
 */
export function getProjectByDeliverableId(
  deliverableId: string,
  projects: WorkstreamDetailsProject[],
) {
  return projects.find((project) => project.scope?.deliverables.includes(deliverableId))
}
