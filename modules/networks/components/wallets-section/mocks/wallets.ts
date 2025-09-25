import type { Wallet } from '../wallets-section'

export const WALLETS: Wallet[] = [
  {
    id: '1',
    name: 'Powerhouse Ops',
    address: '0x12345...ADV313',
    usdsBalance: '1,311,031',
    skyBalance: '1,000,000',
    image: '/networks/wallet-images/blue-wallet.png',
  },
  {
    id: '2',
    name: 'Powerhouse Treasury',
    address: '0x12345...ADV313',
    usdsBalance: '12,000,000',
    skyBalance: '5,550,000',
    image: '/networks/wallet-images/yellow-wallet.png',
  },
  {
    id: '3',
    name: 'Workstream Escrow',
    address: '0x12345...ADV313',
    usdsBalance: '750,000',
    skyBalance: '250,000',
    image: '/networks/wallet-images/red-wallet.png',
  },
]
