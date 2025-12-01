import { ConversionNotice } from '../conversion-notice'
import { FundChangeRate } from '../fund-change-rate'
import { SectionHeader } from '../section-header'
import { SimpleStatCard } from '../simple-stat-card'
import { TransactionHistory } from '../transaction-history'
import type { SnapshotAccountTransaction } from '../../types'

interface FundingOverviewProps {
  transactionHistory: SnapshotAccountTransaction[]
}

function FundingOverview({ transactionHistory }: FundingOverviewProps) {
  return (
    <>
      <div className="relative flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <SectionHeader
          title="MakerDAO Funding Overview"
          subtitle={
            <>
              Totals funds made available to Powerhouse over its entire lifetime , since{' '}
              <b>June 2021</b>.
            </>
          }
          tooltip={
            "Monitor funds made available to Ecosystem Actors, track spending, returns, \
          and reserves, differentiate internal/external transactions, and gain insights into changes in MakerDAO's\
          Lifetime Balances."
          }
        />

        <ConversionNotice className="md:absolute md:top-0 md:right-0" />
      </div>

      <div className="flex w-full flex-wrap gap-2 md:gap-4 lg:flex-nowrap lg:gap-8 xl:gap-8">
        <SimpleStatCard
          date="2025-04-08T21:11:07+00:00"
          value={2924160}
          caption="Initial Lifetime Balance"
          mobileCaption="Initial L.T. Balance"
          className="order-1 w-[calc(50%-var(--spacing))] md:w-[calc(50%-var(--spacing)*2)] lg:w-full lg:min-w-39.5"
        />
        <div className="order-3 w-full lg:order-2 lg:max-w-117 lg:min-w-117 xl:max-w-146 xl:min-w-146 2xl:max-w-160 2xl:min-w-160">
          <FundChangeRate
            netChange={-791666}
            leftValue={500000}
            leftText={
              <>
                <span className="inline lg:hidden">Extra Funds Available</span>
                <span className="hidden lg:inline">Extra Funds Made Available</span>
              </>
            }
            rightValue={291666}
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
          date="2025-05-16T21:11:07+00:00"
          value={3215826}
          hasEqualSign
          caption="New Lifetime Balance"
          mobileCaption="New L.T. Balance"
          className="order-2 w-[calc(50%-var(--spacing))] md:w-[calc(50%-var(--spacing)*2)] lg:order-3 lg:w-full lg:min-w-39.5"
        />
      </div>

      <TransactionHistory transactionHistory={transactionHistory} />
    </>
  )
}

export { FundingOverview }
