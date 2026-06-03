import type { TABS } from '@/modules/networks/lib/constants'
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

export interface RevenueAndSpendingData {
  fees: number
  liquidationIncome: number
  psm: number
  daiSpent: number
  mkrVesting: number
  dsr: number
  annualProfit: number
}
export type RevenueAndSpendingRecords = Record<string, RevenueAndSpendingData>

export interface BarChartSeries {
  name: string
  seriesName: string
  color: string
  value: number
  dataIndex: number
}

export interface StackedAreaSeries {
  type: string
  name: string
  stack: string
  stackStrategy: string
  areaStyle: object
  emphasis: { focus: string }
  showSymbol: false
  data: number[]
  itemStyle: { color: string }
}

export type TabValue = (typeof TABS)[keyof typeof TABS]

export type MetricKey = 'Actuals' | 'PaymentsOnChain' | 'Forecast' | 'OperationalReserves'
export type MetricKeyExtended = MetricKey | 'ProtocolNetOutflow' | 'PaymentsOnChainSum'
export type BudgetKey =
  | 'legacyOthers'
  | 'legacyCoreUnits'
  | 'governanceScope'
  | 'stability'
  | 'support'
  | 'protocol'
  | 'accessibility'
  | 'immutable'
export type FormattedFinancesData = Record<MetricKey, Record<BudgetKey, number[]>>
