import { usLocalizedNumber } from '@/modules/shared/lib/humanization'
import { cn } from '@/modules/shared/lib/utils'
import { ExpenseArrow } from '../transaction/expense-arrow'
import { WalletInfo } from '../transaction/wallet-info'
import type { Token } from '../../types'

interface GroupItemProps {
  name: string
  address: string
  initialBalance: number
  inflow: number
  outflow: number
  newBalance: number
  currency: Token
}

function GroupItem({
  name,
  address,
  initialBalance,
  inflow,
  outflow,
  newBalance,
  currency,
}: GroupItemProps) {
  return (
    <div
      className={cn(
        'flex flex-col overflow-hidden rounded-md',
        'bg-secondary shadow-lg',
        'px-4 py-2 pb-2.5',
        'md:flex-row md:rounded-none md:shadow-none',
        'md:px-2 md:py-1.5 md:pb-1.5',
        'md:hover:bg-muted',
        'lg:px-4 lg:py-1.5 lg:pb-1.5',
        'xl:px-4 xl:py-1.5 xl:pb-2',
      )}
    >
      {/* Wallet Container */}
      <div
        className={cn(
          'mb-2.75',
          'md:mb-0 md:w-[calc(151px+16.1%)]',
          'lg:w-[calc(216px+16.4%)]',
          'xl:w-[calc(276px+16.4%)]',
          '2xl:w-[calc(295px+16.7%)]',
        )}
      >
        <WalletInfo name={name} address={address} />
      </div>

      {/* Initial Balance - Mobile Only */}
      <div className="flex justify-between md:hidden">
        <div className="text-foreground/50 flex items-center gap-1 text-sm leading-4.5 font-semibold">
          Initial Balance
        </div>
        <div className="text-foreground flex flex-wrap items-baseline gap-1 text-sm leading-5.5 font-semibold">
          {usLocalizedNumber(initialBalance)}{' '}
          <span className="text-foreground/50 text-xs leading-4.5 font-medium uppercase">
            {currency}
          </span>
        </div>
      </div>

      {/* Inflow */}
      <div
        className={cn(
          'mt-2 mb-1 flex justify-between',
          'w-[21.6%] md:mt-0 md:mb-0 md:flex-col md:justify-normal md:gap-1.5',
          'lg:w-[21%]',
          'xl:w-[23%]',
          '2xl:w-[22%]',
        )}
      >
        <div className="text-foreground/50 flex items-center gap-1 text-sm leading-4.5 font-semibold md:text-xs md:font-medium">
          <ExpenseArrow isIncoming={true} className="md:hidden" />
          Inflow
        </div>
        <div className="flex flex-wrap items-center gap-1">
          <ExpenseArrow isIncoming={true} className="hidden md:inline-block" />
          <div className="text-foreground flex flex-wrap items-baseline gap-1 text-sm leading-5.5 font-semibold lg:text-base lg:leading-5">
            <span className="text-sm leading-5.5 font-semibold">+</span>
            {usLocalizedNumber(inflow)}{' '}
            <span className="text-foreground/50 text-xs leading-4.5 font-medium uppercase lg:text-sm lg:leading-5.5">
              {currency}
            </span>
          </div>
        </div>
      </div>

      {/* Outflow */}
      <div
        className={cn(
          'mt-2.75 mb-2 flex justify-between',
          'w-[21.6%] md:mt-0 md:mb-0 md:flex-col md:justify-normal md:gap-1.5',
          'lg:w-[21%]',
          'xl:w-[23%]',
          '2xl:w-[22%]',
        )}
      >
        <div className="text-foreground/50 flex items-center gap-1 text-sm leading-4.5 font-semibold md:text-xs md:font-medium">
          <ExpenseArrow isIncoming={false} className="md:hidden" />
          Outflow
        </div>
        <div className="flex flex-wrap items-center gap-1">
          <ExpenseArrow isIncoming={false} className="hidden md:inline-block" />
          <div className="text-foreground flex flex-wrap items-baseline gap-1 text-sm leading-5.5 font-semibold lg:text-base lg:leading-5">
            <span className="text-sm leading-5.5 font-semibold">-</span>
            {usLocalizedNumber(Math.abs(outflow))}{' '}
            <span className="text-foreground/50 text-xs leading-4.5 font-medium uppercase lg:text-sm lg:leading-5.5">
              {currency}
            </span>
          </div>
        </div>
      </div>

      {/* New Balance */}
      <div
        className={cn(
          'flex justify-between',
          'ml-auto md:flex md:flex-col md:items-end md:justify-normal md:gap-1.5',
        )}
      >
        <div className="text-foreground/50 flex items-center gap-1 text-sm leading-4.5 font-semibold md:text-xs md:font-medium">
          New Balance
        </div>
        <div className="text-foreground flex flex-wrap items-baseline gap-1 text-sm leading-5.5 font-semibold lg:text-base lg:leading-5">
          <span>{usLocalizedNumber(Math.abs(newBalance))}</span>{' '}
          <span className="text-foreground/50 text-xs leading-4.5 font-medium uppercase lg:text-sm lg:leading-5.5">
            {currency}
          </span>
        </div>
      </div>
    </div>
  )
}

export { GroupItem }
