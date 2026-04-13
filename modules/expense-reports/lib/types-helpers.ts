import type { SnapshotAccount as GeneratedSnapshotAccount } from '@/modules/__generated__/graphql/switchboard-generated'

export const isGeneratedSnapshotAccount = (item: unknown): item is GeneratedSnapshotAccount => {
  if (typeof item !== 'object' || item === null) {
    return false
  }
  const obj = item as Record<string, unknown>
  return Array.isArray(obj.balances) && Array.isArray(obj.transactions)
}
