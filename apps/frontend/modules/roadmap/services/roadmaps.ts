import {
  type Sow_Agent,
  type Sow_Deliverable,
  type Sow_Project,
  type Sow_Roadmap,
  useRoadmapDetailsQuery,
} from '@/modules/__generated__/graphql/switchboard-generated'

export async function getRoadmapDetailsData(networkSlug: string, roadmapSlug: string) {
  const data = await useRoadmapDetailsQuery.fetcher({
    filter: {
      networkSlug,
    },
  })()

  let roadmap: Sow_Roadmap | null = null

  for (const scopeOfWork of data.scopeOfWorkByNetworkOrStatus) {
    for (const roadmapItem of scopeOfWork.roadmaps) {
      if (roadmapItem.slug === roadmapSlug) {
        roadmap = roadmapItem as Sow_Roadmap
        break
      }
    }
  }

  const deliverablesMap = new Map<string, Sow_Deliverable>()
  const contributorsMap = new Map<string, Sow_Agent>()
  const projectsMap = new Map<string, Sow_Project>()

  data.scopeOfWorkByNetworkOrStatus.forEach((scopeOfWork) => {
    scopeOfWork.deliverables.forEach((deliverable) => {
      deliverablesMap.set(deliverable.id, deliverable as unknown as Sow_Deliverable)
    })
    scopeOfWork.contributors.forEach((contributor) => {
      if (contributor.id) {
        contributorsMap.set(contributor.id, contributor as unknown as Sow_Agent)
      }
    })
    scopeOfWork.projects.forEach((project) => {
      projectsMap.set(project.id, project as unknown as Sow_Project)
    })
  })

  return {
    roadmap,
    deliverables: Array.from(deliverablesMap.values()),
    contributors: Array.from(contributorsMap.values()),
    projects: Array.from(projectsMap.values()),
  }
}
