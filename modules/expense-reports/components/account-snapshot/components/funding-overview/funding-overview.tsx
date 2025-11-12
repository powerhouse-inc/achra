import { cn } from '@/modules/shared/lib/utils'
import { ConversionNotice } from '../conversion-notice'
import { FundChangeRate } from '../fund-change-rate'
import { SectionHeader } from '../section-header'
import { SimpleStatCard } from '../simple-stat-card'

function FundingOverview() {
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

      <div
        className={cn(
          'flex w-full flex-wrap gap-2',

          '[&>div:nth-of-type(1)]:width-[calc(50%-4px)] [&>div:nth-of-type(1)]:order-1',
          '[&>div:nth-of-type(2)]:order-3',
          '[&>div:nth-of-type(3)]:width-[calc(50%-4px)] [&>div:nth-of-type(3)]:order-2',
          // md
          'md:flex-nowrap md:gap-6',
          '[&>div:nth-of-type(1)]:order-1 [&>div:nth-of-type(1)]:min-w-40',
          '[&>div:nth-of-type(2)]:order-2',
          '[&>div:nth-of-type(3)]:order-3 [&>div:nth-of-type(3)]:min-w-40',
          // xl
          'xl:gap-8',
        )}
      >
        <SimpleStatCard caption="Initial Lifetime Balance" />
        <div className="w-full md:max-w-85 md:min-w-85 lg:max-w-117 lg:min-w-117 xl:max-w-146 xl:min-w-146 2xl:max-w-160 2xl:min-w-160">
          <FundChangeRate />
        </div>
        <SimpleStatCard caption="New Lifetime Balance" />
      </div>
    </>
  )
}

export { FundingOverview }
