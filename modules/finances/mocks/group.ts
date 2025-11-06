import { WALLETS } from '@/modules/networks/components/wallets-section/mocks/wallets'
import type { WalletGroup } from '../types'

export const WALLET_GROUPS: WalletGroup[] = [
  {
    id: '1',
    name: 'Core',
    wallets: WALLETS,
  },
  {
    id: '2',
    name: 'Ops',
    wallets: WALLETS,
  },
]
