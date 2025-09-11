import { type DeliverableStatus } from '@/modules/roadmap/components/milestone-details-card/types'

export interface Milestone {
  id: string
  sequenceCode: string
  code: string
  targetDate: string
  title: string
  abstract: string
  status: DeliverableStatus
  progress: number
}
