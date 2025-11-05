import type { Wallet } from '../types'

export function calculateTotalBalance(
  wallets: Wallet[],
  balanceKey: 'usdsBalance' | 'skyBalance',
): number {
  return wallets.reduce((acc, wallet) => {
    return acc + wallet[balanceKey]
  }, 0)
}
