import type { ScopeOfWork_DeliverableStatus } from '@/modules/__generated__/graphql/switchboard-generated'

export interface KeyResult {
  id: string
  title: string
  url: string
  parentIdRef?: string
  status: boolean
}

export interface Deliverable {
  id: string
  title: string
  image: string
  keyResults: KeyResult[]
  status: ScopeOfWork_DeliverableStatus
  progress: number
  qyt: number
  unitBudget: number
  subtotal: number
}
