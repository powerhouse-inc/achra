import { WalletSection } from '@/modules/finances/components/wallet-sections/wallet-section'
import { WALLET_GROUPS } from '@/modules/finances/mocks/group'
import { PageContent } from '@/modules/shared/components/page-containers'

export default function FinancesPage() {
  return (
    <PageContent>
      <WalletSection groupedWallets={WALLET_GROUPS} />
    </PageContent>
  )
}
