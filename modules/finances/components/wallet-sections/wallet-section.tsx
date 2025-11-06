import { useMemo } from 'react'
import { WalletsCard } from '@/modules/networks/components/wallets-section/components/wallets-card/wallets-card'
import { PageContent } from '@/modules/shared/components/page-containers'
import { calculateTotalBalance } from '../../utils'
import { TotalDisplay } from '../total-display'
import type { WalletGroup } from '../../types'

interface WalletSectionProps {
  groupedWallets: WalletGroup[]
}

export function WalletSection({ groupedWallets }: WalletSectionProps) {
  const primaryValue = useMemo(
    () => calculateTotalBalance(groupedWallets, 'usdsBalance'),
    [groupedWallets],
  )
  const secondaryValue = useMemo(
    () => calculateTotalBalance(groupedWallets, 'skyBalance'),
    [groupedWallets],
  )

  return (
    <PageContent>
      <section className="flex flex-col gap-6">
        <div className="flex flex-col justify-end gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="m-0 text-xl/[120%] font-bold">Wallets</h2>
          <div className="flex items-center justify-end gap-4 sm:justify-start">
            <TotalDisplay primaryValue={primaryValue} secondaryValue={secondaryValue} />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {groupedWallets.length > 0 &&
            groupedWallets.map((group) => (
              <WalletsCard key={group.id} wallets={group.wallets} title={group.name} />
            ))}
        </div>
      </section>
    </PageContent>
  )
}
