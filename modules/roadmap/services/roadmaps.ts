import {
  type ScopeOfWork_Agent,
  type ScopeOfWork_Deliverable,
  type ScopeOfWork_Project,
  type ScopeOfWork_Roadmap,
  useRoadmapDetailsQuery,
} from '@/modules/__generated__/graphql/switchboard-generated'

export async function getRoadmapDetailsData(networkSlug: string, roadmapSlug: string) {
  const data = await useRoadmapDetailsQuery.fetcher({
    filter: {
      networkSlug,
    },
  })()

  let roadmap: ScopeOfWork_Roadmap | null = null

  for (const scopeOfWork of data.scopeOfWorkByNetworkOrStatus) {
    for (const roadmapItem of scopeOfWork.roadmaps) {
      if (roadmapItem.slug === roadmapSlug) {
        roadmap = roadmapItem as ScopeOfWork_Roadmap
        break
      }
    }
  }

  const deliverablesMap = new Map<string, ScopeOfWork_Deliverable>()
  const contributorsMap = new Map<string, ScopeOfWork_Agent>()
  const projectsMap = new Map<string, ScopeOfWork_Project>()

  data.scopeOfWorkByNetworkOrStatus.forEach((scopeOfWork) => {
    scopeOfWork.deliverables.forEach((deliverable) => {
      deliverablesMap.set(deliverable.id, deliverable as unknown as ScopeOfWork_Deliverable)
    })
    scopeOfWork.contributors.forEach((contributor) => {
      contributorsMap.set(contributor.id, contributor as ScopeOfWork_Agent)
    })
    scopeOfWork.projects.forEach((project) => {
      projectsMap.set(project.id, project as ScopeOfWork_Project)
    })
  })

  return {
    roadmap,
    deliverables: Array.from(deliverablesMap.values()),
    contributors: Array.from(contributorsMap.values()),
    projects: Array.from(projectsMap.values()),
  }
}
