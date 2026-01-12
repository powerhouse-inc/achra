'use client'

import { Checkbox } from '@/modules/shared/components/ui/checkbox'
import { Label } from '@/modules/shared/components/ui/label'
import { cn } from '@/modules/shared/lib/utils'
import { FundChangeRate } from '../fund-change-rate'
import { ReserveCard } from '../reserve-card'
import { SectionHeader } from '../section-header'
import { SimpleStatCard } from '../simple-stat-card'
import type { SnapshotAccountBalance, UIReservesData } from '../../types'

interface ReservesSnapshotProps {
  teamName: string

  includeOffChain: boolean
  toggleIncludeOffChain: () => void
  startDate?: string
  endDate?: string
  balance?: SnapshotAccountBalance
  onChainData?: UIReservesData[]
  offChainData?: UIReservesData[]
}

function ReservesSnapshot({
  teamName,
  includeOffChain,
  toggleIncludeOffChain,
  startDate,
  endDate,
  balance,
  onChainData,
  offChainData,
}: ReservesSnapshotProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col justify-between gap-2 md:flex-row md:items-end">
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
        <div className="ml-auto flex items-center gap-2">
          <Checkbox
            id="off-chain-reserves"
            checked={includeOffChain}
            onCheckedChange={toggleIncludeOffChain}
          />
          <Label htmlFor="off-chain-reserves">Include Off-Chain Reserves</Label>
        </div>
      </div>

      <div className="flex flex-col gap-8 md:gap-4">
        <div className="flex w-full flex-wrap gap-2 md:gap-4 lg:flex-nowrap lg:gap-6 xl:gap-8">
          <SimpleStatCard
            date={startDate}
            value={balance?.initialBalance}
            caption="Initial Reserves"
            className="order-1 w-[calc(50%-var(--spacing))] md:w-[calc(50%-var(--spacing)*2)] lg:w-full lg:min-w-39.5"
            dynamicChanges
          />
          <div className="order-3 w-full lg:order-2 lg:max-w-117 lg:min-w-117 xl:max-w-146 xl:min-w-146 2xl:max-w-160 2xl:min-w-160">
            <FundChangeRate
              netChange={
                typeof balance?.inflow === 'number' && typeof balance.outflow === 'number'
                  ? balance.outflow - balance.inflow * -1
                  : undefined
              }
              leftValue={balance?.inflow}
              leftText="Inflow"
              rightValue={typeof balance?.outflow === 'number' ? balance.outflow * -1 : undefined}
              rightValueColor="normal"
              rightText="Outflow"
              dynamicChanges={true}
            />
          </div>
          <SimpleStatCard
            date={endDate}
            value={balance?.newBalance}
            hasEqualSign
            caption="New Reserves"
            className="order-2 w-[calc(50%-var(--spacing))] md:w-[calc(50%-var(--spacing)*2)] lg:order-3 lg:w-full lg:min-w-39.5"
            dynamicChanges
          />
        </div>

        {/* on chain sub-section */}
        <div className="flex flex-col gap-6 md:gap-4">
          <SectionHeader
            title="On Chain Reserves"
            subtitle={`Unspent on-chain reserves to the ${teamName} Team.`}
            tooltip={
              <>
                Track and analyze the movement of <br /> On-Chain assets.
              </>
            }
            level="h3"
          />

          <div className="flex flex-col gap-2">
            {onChainData?.map((account) => (
              <ReserveCard key={account.id} account={account} currency="USD" />
            ))}
          </div>
        </div>

        {/* off chain sub-section */}
        <div className={cn('flex flex-col gap-6 md:gap-4', { 'opacity-30': !includeOffChain })}>
          <SectionHeader
            title="Off Chain Reserves"
            subtitle={`Unspent Off-Chain reserves to the ${teamName} Team.`}
            tooltip={
              <>
                Discover essential details about the <br />
                off-chain balances.
              </>
            }
            level="h3"
          />

          <div className="flex flex-col gap-2">
            {offChainData?.map((account) => (
              <ReserveCard key={account.id} account={account} currency="USD" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export { ReservesSnapshot }
