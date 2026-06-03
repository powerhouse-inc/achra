import type { WorkstreamDetailsQuery } from '@/modules/__generated__/graphql/switchboard-generated'

/**
 * Counts the number of milestones and deliverables in the initial proposal's roadmap
 * @param workstream The workstream to count the milestones and deliverables for
 * @returns An object with the number of milestones and deliverables
 */
export function countRoadmapStats(workstream: WorkstreamDetailsQuery['workstream'][0]) {
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

/**
 * Calculates the total budget of the workstream
 * @param workstream The workstream to calculate the total budget for
 * @returns The total budget of the workstream in USD
 */
export function calculateTotalBudget(workstream: WorkstreamDetailsQuery['workstream'][0]): number {
  return (
    workstream.initialProposal?.sow?.roadmaps.reduce<number>((acc, roadmap) => {
      return (
        acc +
        roadmap.milestones.reduce<number>((acc, milestone) => {
          return acc + (milestone.budget ?? 0)
        }, 0)
      )
    }, 0) ?? 0
  )
}
