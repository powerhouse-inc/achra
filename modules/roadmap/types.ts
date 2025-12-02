import type { RoadmapDetailsQuery } from '../__generated__/graphql/switchboard-generated'

export type RoadmapDetails =
  RoadmapDetailsQuery['scopeOfWorkByNetworkOrStatus'][number]['roadmaps'][number]
export type RoadmapDetails_Milestone =
  RoadmapDetailsQuery['scopeOfWorkByNetworkOrStatus'][number]['roadmaps'][number]['milestones'][number]
export type RoadmapDetails_Deliverable =
  RoadmapDetailsQuery['scopeOfWorkByNetworkOrStatus'][number]['deliverables'][number]
export type RoadmapDetails_Contributor =
  RoadmapDetailsQuery['scopeOfWorkByNetworkOrStatus'][number]['contributors'][number]
export type RoadmapDetails_Project =
  RoadmapDetailsQuery['scopeOfWorkByNetworkOrStatus'][number]['projects'][number]
