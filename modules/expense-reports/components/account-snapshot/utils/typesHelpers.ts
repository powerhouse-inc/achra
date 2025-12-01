import type { SnapshotAccount } from '../types'

export const isAccountSnapshot = (snapshotAccount: unknown): snapshotAccount is SnapshotAccount => {
  if (typeof snapshotAccount !== 'object' || snapshotAccount === null) {
    return false
  }
  const account = snapshotAccount as SnapshotAccount
  if (
    'accountLabel' in account ||
    'accountType' in account ||
    'snapshotAccountBalance' in account
  ) {
    return true
  }
  return false
}
