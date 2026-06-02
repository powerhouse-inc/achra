import type { AuditStatusEnum } from './audit-status-enum'

export interface AuditReport {
  id: string
  budgetStatementId: string
  auditStatus: AuditStatusEnum
  reportUrl: string
  timestamp: string
}
