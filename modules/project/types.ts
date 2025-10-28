import type { ScopeOfWork_DeliverableSetStatus } from '../__generated__/graphql/switchboard-generated'

export interface KeyResult {
  id: string
  title: string
  url: string
  parentIdRef?: string
  status: KeyResultStatus
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

export enum KeyResultStatus {
  WONT_DO = 'WONT_DO',
  DRAFT = 'DRAFT',
  TODO = 'TODO',
  BLOCKED = 'BLOCKED',
  IN_PROGRESS = 'IN_PROGRESS',
  DELIVERED = 'DELIVERED',
  CANCELED = 'CANCELED',
}
