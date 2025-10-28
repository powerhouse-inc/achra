import type { ScopeOfWork_DeliverableSetStatus } from '../__generated__/graphql/switchboard-generated'

export interface KeyResult {
  id: string
  title: string
  url: string
  parentIdRef?: string
}

export interface BProject {
  code: string
  title: string
}

export interface Deliverable {
  id: string
  title: string
  image: string
  keyResults: KeyResult[]
  status: ScopeOfWork_DeliverableSetStatus
  progress: number
  qyt: number
  unitBudget: number
  subtotal: number
}
