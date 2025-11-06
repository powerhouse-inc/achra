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
