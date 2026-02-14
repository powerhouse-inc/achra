import type { SnapshotAccountTransaction } from '@/modules/__generated__/graphql/switchboard-generated'
import type { CalculatedBalance } from '@/modules/expense-reports/types'
import { ConversionNotice } from '../conversion-notice'
import { FundChangeRate } from '../fund-change-rate'
import { SectionHeader } from '../section-header'
import { SimpleStatCard } from '../simple-stat-card'
import { TransactionHistory } from '../transaction-history'

interface FundingOverviewProps {
  builderName: string
  startDate: string
  endDate: string
  balance: CalculatedBalance
  transactionHistory: SnapshotAccountTransaction[]
}

function FundingOverview({
  builderName,
  startDate,
  endDate,
  balance,
  transactionHistory,
}: FundingOverviewProps) {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <div className="relative flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
        <SectionHeader
          title={`${builderName} Funding Overview`}
          subtitle={`Monitor funds made available, track spending, returns, and reserves, differentiate internal/external transactions, and gain insights into changes in ${builderName} Lifetime Balances.`}
          tooltip={
            "Monitor funds made available to Ecosystem Actors, track spending, returns, \
          and reserves, differentiate internal/external transactions, and gain insights into changes in MakerDAO's\
          Lifetime Balances."
          }
        />

        <ConversionNotice className="lg:absolute lg:top-0 lg:right-0" />
      </div>

      <div className="flex flex-col gap-4 lg:gap-6 xl:gap-8">
        <div className="flex w-full flex-wrap gap-2 md:gap-4 lg:flex-nowrap lg:gap-6 xl:gap-8">
          <SimpleStatCard
            date={startDate}
            value={Math.abs(balance.startingBalance)}
            caption={
              <>
                <span className="inline-block md:hidden">Initial L.T. Balance</span>
                <span className="hidden md:inline-block">Initial Lifetime Balance</span>
              </>
            }
            className="order-1 w-[calc(50%-var(--spacing))] md:w-[calc(50%-var(--spacing)*2)] lg:w-full lg:min-w-39.5"
          />
          <div className="order-3 w-full lg:order-2 lg:max-w-117 lg:min-w-117 xl:max-w-146 xl:min-w-146 2xl:max-w-160 2xl:min-w-160">
            <FundChangeRate
              netChange={balance.outflow - balance.inflow}
              leftValue={balance.outflow}
              leftText={
                <>
                  <span className="inline lg:hidden">Extra Funds Available</span>
                  <span className="hidden lg:inline">Extra Funds Made Available</span>
                </>
              }
              rightValue={balance.inflow}
              rightValueColor="green"
              rightText={
                <>
                  <span className="inline lg:hidden">Funds R. via DSSBlow</span>
                  <span className="hidden lg:inline xl:hidden">Funds Rtnd via DSSBlow</span>
                  <span className="hidden xl:inline">Funds Returned via DSSBlow</span>
                </>
              }
            />
          </div>
          <SimpleStatCard
            date={endDate}
            value={balance.endingBalance}
            hasEqualSign
            caption={
              <>
                <span className="inline-block md:hidden">New L.T. Balance</span>
                <span className="hidden md:inline-block">New Lifetime Balance</span>
              </>
            }
            className="order-2 w-[calc(50%-var(--spacing))] md:w-[calc(50%-var(--spacing)*2)] lg:order-3 lg:w-full lg:min-w-39.5"
          />
        </div>

        <TransactionHistory transactionHistory={transactionHistory} />
      </div>
    </div>
  )
}

export { FundingOverview }
