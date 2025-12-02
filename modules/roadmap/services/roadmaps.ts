import { useRoadmapDetailsQuery } from '@/modules/__generated__/graphql/switchboard-generated'
import type {
  RoadmapDetails,
  RoadmapDetails_Contributor,
  RoadmapDetails_Deliverable,
  RoadmapDetails_Project,
} from '../types'

export async function getRoadmapDetailsData(networkSlug: string, roadmapSlug: string) {
  const data = await useRoadmapDetailsQuery.fetcher({
    filter: {
      networkSlug,
    },
  })()

  let roadmap: RoadmapDetails | null = null

  for (const scopeOfWork of data.scopeOfWorkByNetworkOrStatus) {
    for (const roadmapItem of scopeOfWork.roadmaps) {
      if (roadmapItem.slug === roadmapSlug) {
        roadmap = roadmapItem
        break
      }
    }
  }

  const deliverablesMap = new Map<string, RoadmapDetails_Deliverable>()
  const contributorsMap = new Map<string, RoadmapDetails_Contributor>()
  const projectsMap = new Map<string, RoadmapDetails_Project>()

  data.scopeOfWorkByNetworkOrStatus.forEach((scopeOfWork) => {
    scopeOfWork.deliverables.forEach((deliverable) => {
      deliverablesMap.set(deliverable.id, deliverable)
    })
    scopeOfWork.contributors.forEach((contributor) => {
      contributorsMap.set(contributor.id, contributor)
    })
    scopeOfWork.projects.forEach((project) => {
      projectsMap.set(project.id, project)
    })
  })

  return {
    roadmap,
    deliverables: Array.from(deliverablesMap.values()),
    contributors: Array.from(contributorsMap.values()),
    projects: Array.from(projectsMap.values()),
  }
}
