import type { SnapshotAccount } from '@/modules/__generated__/graphql/switchboard-generated'
import type { CalculatedBalance } from './types'

// TODO: move this to the types file
export interface OperationalGroup {
  type: 'group'
  id: string
  label: string
  balance: CalculatedBalance
  children: SnapshotAccount[]
}

export type ReserveAccount = SnapshotAccount | OperationalGroup

export function isOperationalGroup(account: ReserveAccount): account is OperationalGroup {
  return 'children' in account && Array.isArray(account.children)
}
