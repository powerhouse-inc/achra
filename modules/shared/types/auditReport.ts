import type { AuditStatusEnum } from '../enums/auditStatusEnum'

export interface AuditReport {
  id: string
  budgetStatementId: string
  auditStatus: AuditStatusEnum
  reportUrl: string
  timestamp: string
}
