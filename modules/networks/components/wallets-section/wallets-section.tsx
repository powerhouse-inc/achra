'use client'

import { cn } from '@/shared/lib/utils'
import SectionTitle from '../section-title/section-title'

export interface Wallet {
  id: string
  name: string
  address: string
  usdsBalance: string
  skyBalance: string
  isConnected: boolean
}

export interface WalletsSectionProps {
  wallets: Wallet[]
  className?: string
}

export default function WalletsSection({ wallets, className }: WalletsSectionProps) {
  return (
    <section
      className={cn(
        `flex w-full flex-col gap-6 ${wallets.length === 0 ? 'hidden' : ''}`,
        className,
      )}
    >
      <div className="flex flex-col">
        <SectionTitle title="Wallets" hash="wallets" />
      </div>
    </section>
  )
}
