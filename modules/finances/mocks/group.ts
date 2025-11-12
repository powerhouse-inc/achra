import { WALLETS } from '@/modules/networks/components/wallets-section/mocks/wallets'
import type { FiancesNavigationCard, WalletGroup } from '../types'

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

export const FINANCES_NAVIGATION_CARDS: FiancesNavigationCard[] = [
  {
    budgetCapValue: 0,
    code: 'atlas/immutable',
    codePath: 'atlas/immutable',
    color: '#F99374',
    description: 'Endgame constitutional expense data as defined in the Sky Atlas.',
    href: '/finances/immutable?year=2025',
    image:
      'https://raw.githubusercontent.com/makerdao-ses/makerdao-ses.github.io/16f73df6917a57915cd07e79f7a42e55293b8225/ecosystem-dashboard/budgets/endgame_atlas_budgets.svg',
    percent: 0,
    title: 'Atlas Immutable Budget',
    totalDai: 0,
    valueDai: 0,
  },
  {
    budgetCapValue: 1642500.0000000005,
    code: 'atlas/scopes',
    codePath: 'atlas/scopes',
    color: '#447AFB',
    description:
      'Endgame operational expenses from the period 2023-2024, divided into five scopes.',
    href: '/finances/scopes?year=2025',
    image:
      'https://raw.githubusercontent.com/makerdao-ses/makerdao-ses.github.io/16f73df6917a57915cd07e79f7a42e55293b8225/ecosystem-dashboard/budgets/endgame_scope_budgets.svg',
    percent: 0,
    title: 'Scope Framework Budget',
    totalDai: 0,
    valueDai: 0,
  },
  {
    budgetCapValue: 0,
    code: 'atlas/legacy',
    codePath: 'atlas/legacy',
    color: '#2DC1B1',
    description: 'Pre-Endgame expense data from the period 2021-2023.',
    href: '/finances/legacy?year=2025',
    image:
      'https://raw.githubusercontent.com/makerdao-ses/makerdao-ses.github.io/16f73df6917a57915cd07e79f7a42e55293b8225/ecosystem-dashboard/budgets/makerDAO_legacy_budgets.svg',
    percent: 0,
    title: 'MakerDAO Legacy Budget',
    totalDai: 0,
    valueDai: 0,
  },
  {
    budgetCapValue: 0,
    code: 'atlas/legacy2',
    codePath: 'atlas/legacy',
    color: '#2DC1B1',
    description: 'Pre-Endgame expense data from the period 2021-2023.',
    href: '/finances/legacy?year=2025',
    image:
      'https://raw.githubusercontent.com/makerdao-ses/makerdao-ses.github.io/16f73df6917a57915cd07e79f7a42e55293b8225/ecosystem-dashboard/budgets/makerDAO_legacy_budgets.svg',
    percent: 0,
    title: 'MakerDAO Legacy Budget',
    totalDai: 0,
    valueDai: 0,
  },
  {
    budgetCapValue: 0,
    code: 'atlas/legacy3',
    codePath: 'atlas/legacy',
    color: '#2DC1B1',
    description: 'Pre-Endgame expense data from the period 2021-2023.',
    href: '/finances/legacy?year=2025',
    image:
      'https://raw.githubusercontent.com/makerdao-ses/makerdao-ses.github.io/16f73df6917a57915cd07e79f7a42e55293b8225/ecosystem-dashboard/budgets/makerDAO_legacy_budgets.svg',
    percent: 0,
    title: 'MakerDAO Legacy Budget',
    totalDai: 0,
    valueDai: 0,
  },
  {
    budgetCapValue: 0,
    code: 'atlas/legacy4',
    codePath: 'atlas/legacy',
    color: '#2DC1B1',
    description: 'Pre-Endgame expense data from the period 2021-2023.',
    href: '/finances/legacy?year=2025',
    image:
      'https://raw.githubusercontent.com/makerdao-ses/makerdao-ses.github.io/16f73df6917a57915cd07e79f7a42e55293b8225/ecosystem-dashboard/budgets/makerDAO_legacy_budgets.svg',
    percent: 0,
    title: 'MakerDAO Legacy Budget',
    totalDai: 0,
    valueDai: 0,
  },
]
