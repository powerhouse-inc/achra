import type { ExtendedExecutiveProposal } from '@/modules/shared/types/makervote'
import type { notifyMeSchema } from './lib/notify-me-schema'
import type { z } from 'zod'

export interface NotifyMeResult {
  email: string
}

export interface NotifyMeFormState {
  success: boolean
  error?: string
  data?: NotifyMeResult
}

export type NotifyMeFormValues = z.infer<typeof notifyMeSchema>

/** Forum API topic (subset of fields we use). */
export interface Topic {
  id: number
  created_at: string
  title: string
  tags: string[]
  like_count: number
  posts_count: number
  slug: string
  category_id: number
}

export interface TopicList {
  topic_list: {
    topics: Topic[]
  }
}

export interface GroupedGovernanceProposals {
  openProposals: ExtendedExecutiveProposal[]
  activeProposals: ExtendedExecutiveProposal[]
  passedProposals: ExtendedExecutiveProposal[]
  slicedPassedProposals: ExtendedExecutiveProposal[]
}

export enum SortEnum {
  Neutral = 'neutral',
  Asc = 'asc',
  Desc = 'desc',
  Disabled = 'disabled',
}
