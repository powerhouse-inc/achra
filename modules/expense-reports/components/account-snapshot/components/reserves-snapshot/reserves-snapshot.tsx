import { Checkbox } from '@/modules/shared/components/ui/checkbox'
import { Label } from '@/modules/shared/components/ui/label'
import { FundChangeRate } from '../fund-change-rate'
import { SectionHeader } from '../section-header'
import { SimpleStatCard } from '../simple-stat-card'

interface ReservesSnapshotProps {
  teamName: string
}

function ReservesSnapshot({ teamName }: ReservesSnapshotProps) {
  return (
    <div>
      <div className="mb-4 flex flex-col items-end justify-between md:flex-row md:items-start md:gap-2 lg:items-end">
        <SectionHeader
          title="Total Reserves"
          subtitle={`On-Chain and off-chain reserves accessible to the ${teamName} Team.`}
          tooltip={
            'Explore on and off-chain balances in DAI and other currencies, identify the flow of funds and track the \
             total inflow from the Maker Protocol to internal operational wallets, as well as the outflow to external \
             wallets (e.g., Payment Processor) wallets.'
          }
          level="h2"
        />
        <div className="flex items-center gap-2">
          <Checkbox id="off-chain-reserves" />
          <Label htmlFor="off-chain-reserves">Include Off-Chain Reserves</Label>
        </div>
      </div>

      <div className="flex w-full flex-wrap gap-2 md:gap-4 lg:flex-nowrap lg:gap-8 xl:gap-8">
        <SimpleStatCard
          date="2025-04-08T21:11:07+00:00"
          value={2924160}
          caption="Initial Reserves"
          className="order-1 w-[calc(50%-var(--spacing))] md:w-[calc(50%-var(--spacing)*2)] lg:w-full lg:min-w-39.5"
        />
        <div className="order-3 w-full lg:order-2 lg:max-w-117 lg:min-w-117 xl:max-w-146 xl:min-w-146 2xl:max-w-160 2xl:min-w-160">
          <FundChangeRate
            netChange={-791666}
            leftValue={500000}
            leftText="Inflow"
            rightValue={291666}
            rightValueColor="normal"
            rightText="Outflow"
            dynamicChanges={true}
          />
        </div>
        <SimpleStatCard
          date="2025-05-16T21:11:07+00:00"
          value={3215826}
          hasEqualSign
          caption="New Reserves"
          className="order-2 w-[calc(50%-var(--spacing))] md:w-[calc(50%-var(--spacing)*2)] lg:order-3 lg:w-full lg:min-w-39.5"
        />
      </div>
    </div>
  )
}

export { ReservesSnapshot }
