import {
  useProjectsQuery,
  useWorkstreamProjectQuery,
} from '@/modules/__generated__/graphql/switchboard-generated'
import type { WorkstreamDetailsProject } from '../types'

export async function getWorkstreamProjects(networkSlug: string, workstreamSlug: string) {
  const data = await useWorkstreamProjectQuery.fetcher({
    filter: {
      networkSlug,
      workstreamSlug,
    },
  })()

  if (!data.workstream[0]) {
    return null
  }

  return data.workstream[0]
}
export async function getWorkstreamsProjects(options: {
  networkSlugs?: string[]
}): Promise<Map<string, WorkstreamDetailsProject[]>> {
  const data = await useProjectsQuery.fetcher({
    filter: {
      networkNames: options.networkSlugs,
    },
  })()

  const projectsMap = new Map<string, WorkstreamDetailsProject[]>()

  for (const workstream of data.workstreams) {
    const workstreamSlug = workstream.slug ?? 'unknown'
    const projects = (workstream.initialProposal?.sow?.projects ?? []) as WorkstreamDetailsProject[]
    projectsMap.set(workstreamSlug, projects)
  }

  return projectsMap
}
