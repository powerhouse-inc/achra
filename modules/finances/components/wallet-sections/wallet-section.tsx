import { useMemo } from 'react'
import { WALLETS } from '@/modules/networks/components/wallets-section/mocks/wallets'
import { PageContent } from '@/modules/shared/components/page-containers'
import { calculateTotalBalance } from '../../utils'
import { TotalDisplay } from '../total-display'

export function WalletSection() {
  const primaryValue = useMemo(() => calculateTotalBalance(WALLETS, 'usdsBalance'), [])
  const secondaryValue = useMemo(() => calculateTotalBalance(WALLETS, 'skyBalance'), [])

  return (
    <PageContent>
      <section className="flex flex-col gap-6">
        <div className="flex flex-row items-center justify-between">
          <h2 className="m-0 text-xl/[120%] font-bold">Wallets</h2>
          <div className="flex items-center gap-4">
            <TotalDisplay primaryValue={primaryValue} secondaryValue={secondaryValue} />
          </div>
        </div>
      </section>
    </PageContent>
  )
}
