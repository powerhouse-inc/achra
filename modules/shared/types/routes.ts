import type { Route } from 'next'

export type NetworkSlug =
  | 'sky'
  | 'powerhouse'
  | 'spark'
  | 'grove'
  | 'launch-agent-2'
  | 'launch-agent-3'

export type NetworkPages = 'contributors' | 'roadmaps' | 'finances' | 'builders'

export type RouteWithDynamicPages = Route<
  | '/networks'
  | `/network/${NetworkSlug}`
  | `/network/${NetworkSlug}/${NetworkPages}`
  | `/network/${NetworkSlug}/roadmaps/${string}`
  | `/network/${NetworkSlug}/roadmap/${string}`
  | `/network/${NetworkSlug}/workstream/${string}`
>
