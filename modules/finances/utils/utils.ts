import type { WalletGroup } from '../types'

export function calculateTotalBalance(
  walletGroups: WalletGroup[],
  balanceKey: 'usdsBalance' | 'skyBalance',
): number {
  return walletGroups.reduce((acc, group) => {
    const groupTotal = group.wallets.reduce((groupAcc, wallet) => {
      return groupAcc + wallet[balanceKey]
    }, 0)
    return acc + groupTotal
  }, 0)
}

export function percentageRespectTo(value: number, total: number): number {
  if (total === 0) return 0
  return (value / total) * 100
}

export function truncateDescription(description: string): string {
  // Simple truncation - can be enhanced with word boundaries if needed
  const maxLength = 100
  if (description.length <= maxLength) {
    return description
  }
  return `${description.slice(0, maxLength)}...`
}
