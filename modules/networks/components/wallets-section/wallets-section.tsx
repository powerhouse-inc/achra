'use client'

import { NetworkHomepageSections, SCROLL_MT_CLASSES } from '@/modules/shared/config/constants'
import { cn } from '@/shared/lib/utils'
import { encodeSectionId } from '../../../shared/components/section-activation/section-id-utils'
import SectionTitle from '../section-title/section-title'
import { WalletsCard } from './components/wallets-card/wallets-card'

export interface Wallet {
  id: string
  name: string
  address: string
  usdsBalance: number
  skyBalance: number
}

export interface WalletsSectionProps {
  wallets: Wallet[]
  className?: string
}

export function WalletsSection({ wallets, className }: WalletsSectionProps) {
  return (
    <section
      className={cn(
        'flex w-full flex-col gap-6',
        SCROLL_MT_CLASSES,
        { hidden: wallets.length === 0 },
        className,
      )}
      id={encodeSectionId(NetworkHomepageSections.Wallets)}
    >
      <SectionTitle title="Wallets" hash="wallets" />
      <WalletsCard wallets={wallets} />
    </section>
  )
}
