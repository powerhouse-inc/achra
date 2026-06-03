import type { ChangeTrackingEvent } from './activity'
import type { AuditReport } from './audit-report'
import type { BudgetStatementComment } from './budget-statement-comment'
import type { BudgetStatementWallet } from './budget-statement-wallet'
import type { BudgetStatus } from './common-enums'

export interface BudgetStatementFTEs {
  id?: string
  budgetStatementId?: string
  month: string
  ftes: number
}

export interface BudgetStatementMKRVest {
  id: string
  budgetStatementId?: string
  vestingDate: string
  mkrAmount: number
  mkrAmountOld: number
  comments: string
}

export interface BudgetStatement {
  id: string
  owner: {
    id: string
    icon: string
    name: string
    shortCode: string
  }
  ownerType: string
  month: string
  status?: BudgetStatus
  ownerCode: string
  mkrProgramLength: number
  publicationUrl: string
  activityFeed: ChangeTrackingEvent[]
  auditReport: AuditReport[]
  budgetStatementFTEs: BudgetStatementFTEs[]
  budgetStatementMKRVest: BudgetStatementMKRVest[]
  budgetStatementWallet: BudgetStatementWallet[]
  comments: BudgetStatementComment[]
  actualExpenses: number | null
  forecastExpenses: number | null
  paymentsOnChain: number | null
  netProtocolOutflow: number | null
}
