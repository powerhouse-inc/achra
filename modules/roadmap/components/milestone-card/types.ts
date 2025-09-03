export interface Milestone {
  id: string
  sequenceCode: string
  code: string
  targetDate: string
  title: string
  abstract: string
  status: 'To do' | 'In Progress' | 'Delivered'
  progress: number
}
