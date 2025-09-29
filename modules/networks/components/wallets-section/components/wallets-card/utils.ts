import type { Wallet } from '../../wallets-section'

interface CalculateTotalBalanceParams {
  wallets: Wallet[]
  balanceKey: keyof Pick<Wallet, 'usdsBalance' | 'skyBalance'>
}

export const calculateTotalBalance = ({ wallets, balanceKey }: CalculateTotalBalanceParams) => {
  const total = wallets.reduce((acc, wallet) => {
    return acc + wallet[balanceKey]
  }, 0)
  return total.toLocaleString()
}

export const addressShortener = (address: string) => {
  return `${address.slice(0, 7)}...${address.slice(-6)}`
}
