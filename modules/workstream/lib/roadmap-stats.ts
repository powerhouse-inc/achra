import type { FullQueryWorkstream } from '@/modules/__generated__/graphql/switchboard-generated'

/**
 * Counts the number of milestones and deliverables in the initial proposal's roadmap
 * @param workstream The workstream to count the milestones and deliverables for
 * @returns An object with the number of milestones and deliverables
 */
export function countRoadmapStats(workstream: FullQueryWorkstream) {
  let milestones = 0
  let deliverables = 0

  workstream.initialProposal?.sow?.roadmaps.forEach((roadmap) => {
    milestones += roadmap.milestones.length

    roadmap.milestones.forEach((milestone) => {
      deliverables += milestone.scope?.deliverables.length ?? 0
    })
  })

  return {
    milestones,
    deliverables,
  }
}
