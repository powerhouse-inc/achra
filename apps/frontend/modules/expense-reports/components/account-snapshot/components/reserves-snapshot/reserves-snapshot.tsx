import type { SnapshotAccount } from '@/modules/__generated__/graphql/switchboard-generated'
import { buildOperationalGroup } from '@/modules/expense-reports/lib/build-operational-group'
import type { CalculatedBalance } from '@/modules/expense-reports/types'
import { FundChangeRate } from '../fund-change-rate'
import { ReserveCard } from '../reserve-card'
import { SectionHeader } from '../section-header'
import { SimpleStatCard } from '../simple-stat-card'

interface ReservesSnapshotProps {
  builderName: string
  startDate: string
  endDate: string
  balance: CalculatedBalance
  accounts: SnapshotAccount[]
}

function ReservesSnapshot({
  builderName,
  startDate,
  endDate,
  balance,
  accounts,
}: ReservesSnapshotProps) {
  const operationalGroup = buildOperationalGroup(accounts)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col justify-between gap-2 md:flex-row md:items-end">
        <SectionHeader
          title="Total Reserves"
          subtitle={`On-Chain and off-chain reserves accessible to the ${builderName} Team.`}
          tooltip={
            'Explore on and off-chain balances USD related cryptocurrencies, identify the flow of funds and track the total inflow \
            from source to internal operational wallets, as well as the outflow to external wallets (e.g., Payment Processor) wallets.'
          }
          level="h2"
        />
      </div>

      <div className="flex flex-col gap-8 md:gap-4">
        <div className="flex w-full flex-wrap gap-2 md:gap-4 lg:flex-nowrap lg:gap-6 xl:gap-8">
          <SimpleStatCard
            date={startDate}
            value={balance.startingBalance}
            caption="Initial Reserves"
            className="order-1 w-[calc(50%-var(--spacing))] md:w-[calc(50%-var(--spacing)*2)] lg:w-full lg:min-w-39.5"
            dynamicChanges={false}
          />
          <div className="order-3 w-full lg:order-2 lg:max-w-117 lg:min-w-117 xl:max-w-146 xl:min-w-146 2xl:max-w-160 2xl:min-w-160">
            <FundChangeRate
              netChange={balance.inflow - balance.outflow}
              leftValue={balance.inflow}
              leftText="Inflow"
              rightValue={balance.outflow}
              rightValueColor="normal"
              rightText="Outflow"
              dynamicChanges={false}
            />
          </div>
          <SimpleStatCard
            date={endDate}
            value={balance.endingBalance}
            hasEqualSign
            caption="New Reserves"
            className="order-2 w-[calc(50%-var(--spacing))] md:w-[calc(50%-var(--spacing)*2)] lg:order-3 lg:w-full lg:min-w-39.5"
            dynamicChanges={false}
          />
        </div>

        {/* on chain sub-section */}
        <div className="flex flex-col gap-6 md:gap-4">
          <SectionHeader
            title="On Chain Reserves"
            subtitle={`Unspent on-chain reserves to the ${builderName} Team.`}
            tooltip={
              <>
                Track and analyze the movement of <br /> On-Chain assets.
              </>
            }
            level="h3"
          />

          <div className="flex flex-col gap-2">
            <ReserveCard account={operationalGroup} />
          </div>
        </div>
      </div>
    </div>
  )
}

export { ReservesSnapshot }
