'use client'

import { cn } from '@/shared/lib/utils'
import SectionTitle from '../section-title/section-title'
import { WalletsCard } from './components/wallets-card/wallets-card'

export interface Wallet {
  id: string
  name: string
  address: string
  usdsBalance: string
  skyBalance: string
}

export interface WalletsSectionProps {
  wallets: Wallet[]
  className?: string
}

export function WalletsSection({ wallets, className }: WalletsSectionProps) {
  return (
    <section
      className={cn(
        `flex w-full flex-col gap-6 ${wallets.length === 0 ? 'hidden' : ''}`,
        className,
      )}
    >
      <SectionTitle title="Wallets" hash="wallets" />
      <WalletsCard wallets={wallets} />
    </section>
  )
}
