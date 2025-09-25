import type { Wallet } from '../../wallets-section'

interface CalculateTotalBalanceParams {
  wallets: Wallet[]
  balanceKey: keyof Pick<Wallet, 'usdsBalance' | 'skyBalance'>
}

export const calculateTotalBalance = ({ wallets, balanceKey }: CalculateTotalBalanceParams) => {
  const total = wallets.reduce((acc, wallet) => {
    const cleanValue = wallet[balanceKey].replace(/,/g, '')
    const numericValue = parseFloat(cleanValue) || 0 // Fallback to 0 if parsing fails
    return acc + numericValue
  }, 0)

  // Format the total with commas
  return total.toLocaleString()
}
