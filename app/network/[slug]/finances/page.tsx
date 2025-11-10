import { BreadcrumbSelectYear } from '@/modules/finances/components/breadcrumb-select-year'
import { WalletSection } from '@/modules/finances/components/wallet-sections'
import { WALLET_GROUPS } from '@/modules/finances/mocks/group'
import { PageContent } from '@/modules/shared/components/page-containers'
import { UsdsIcon } from '@/modules/shared/components/svgs'

export default function FinancesPage() {
  return (
    <main>
      <BreadcrumbSelectYear />
      <PageContent variant="with-breadcrumb" as="div" className="flex flex-col gap-4">
        <WalletSection groupedWallets={WALLET_GROUPS} />
        <div className="mt-2 flex items-center justify-end gap-2 text-xs/5 font-semibold xl:text-sm">
          <UsdsIcon className="size-5 md:size-6" />
          *All values are converted to USDS
        </div>
      </PageContent>
    </main>
  )
}
