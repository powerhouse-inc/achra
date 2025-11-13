export interface Wallet {
  id: string
  name: string
  address: string
  usdsBalance: number
  skyBalance: number
}

export interface WalletGroup {
  id: string
  name: string
  wallets: Wallet[]
}

export interface HorizontalBudgetBarProps {
  actuals: number
  prediction: number
  budgetCap: number
  className?: string
  maxPercentage?: number
}

export interface QuarterCardProps {
  paymentsOnChain: number
  budgetCap: number
}

export interface FiancesNavigationCard {
  image: string
  title: string
  description?: string
  href: string
  totalUSDS?: number
  valueUSDS?: number
  budgetCapValue?: number
  color: string
  code: string
  codePath?: string
  percent: number
}
