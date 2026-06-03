import type { OperationalGroup, ReserveAccount } from '@/modules/expense-reports/types'

export function isOperationalGroup(account: ReserveAccount): account is OperationalGroup {
  return 'children' in account && Array.isArray(account.children)
}
