import { WalletSection } from '@/modules/finances/components/wallet-sections'
import { YearFilterWithMetrics } from '@/modules/finances/components/year-filter-with-metrics'
import { WALLET_GROUPS } from '@/modules/finances/mocks/group'
import { PageContent } from '@/modules/shared/components/page-containers'

export default function FinancesPage() {
  return (
    <PageContent>
      <YearFilterWithMetrics />
      <WalletSection groupedWallets={WALLET_GROUPS} />
    </PageContent>
  )
}
