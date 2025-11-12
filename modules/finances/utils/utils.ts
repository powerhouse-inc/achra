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

export const truncateDescription = (description: string, wordLimit = 100) => {
  const words = description.split(' ')
  if (words.length > wordLimit) {
    return `${words.slice(0, wordLimit).join(' ')}...`
  }
  return description
}
