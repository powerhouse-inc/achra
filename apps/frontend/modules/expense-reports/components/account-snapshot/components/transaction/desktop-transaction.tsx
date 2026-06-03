import { utc } from '@date-fns/utc'
import { format, parseISO } from 'date-fns'
import { AccountTransactionDirection } from '@/modules/__generated__/graphql/switchboard-generated'
import { usLocalizedNumber } from '@/modules/shared/lib/humanization'
import { cn } from '@/modules/shared/lib/utils'
import { TxHash } from '../tx-hash'
import { ExpenseArrow } from './expense-arrow'
import { WalletInfo } from './wallet-info'
import type { TransactionProps } from './transaction'

function DesktopTransaction({
  label,
  date,
  toDate,
  amount,
  txHash,
  counterPartyName,
  counterPartyAddress,
  highlightPositiveAmounts = false,
  direction,
}: TransactionProps) {
  const isIncomingTransaction = direction === AccountTransactionDirection.Inflow
  const formattedDate = toDate
    ? `${format(parseISO(date), 'dd-MMM-yyyy', { in: utc })} to ${format(parseISO(toDate), 'dd-MMM-yyyy', { in: utc })}`
    : `${format(parseISO(date), 'dd-MMM-yyyy HH:mm', { in: utc })} UTC`

  return (
    <div
      className={cn(
        'grid py-[6px] pr-6 pb-[5px] pl-3',
        'grid-cols-[172px_1fr_max-content]',
        'not-first-of-type:border-border not-first-of-type:border-t',
        'hover:bg-muted',
        'md:grid-cols-[calc(var(--spacing)*63)_1fr_max-content] md:py-[6px] md:pr-10 md:pb-[5px] md:pl-2',
        'lg:grid-cols-[calc(var(--spacing)*99)_1fr_max-content] lg:py-2 lg:pr-4 lg:pb-[7px] lg:pl-5',
        'xl:grid-cols-[calc(var(--spacing)*101.5)_1fr_max-content] xl:py-2 xl:pb-[7px] xl:pl-5',
      )}
    >
      {/* transaction header */}
      <div className="flex gap-2 lg:gap-4">
        <ExpenseArrow
          isIncoming={isIncomingTransaction}
          isSwap={label === 'Swap'}
          className="mt-1.25 size-6 min-w-6"
        />
        <div className="flex flex-col">
          <div className="text-sm/5.5 font-medium md:font-semibold">{label}</div>
          <div className="text-foreground/30 text-xs/4.5 uppercase">{formattedDate}</div>
          <TxHash txHash={txHash} />
        </div>
      </div>

      {/* transaction counter party */}
      <div className="flex flex-col gap-0.5 pr-2.5 lg:ml-4">
        <div className="text-foreground/50 text-xs/4.5">
          {isIncomingTransaction ? 'Sender Address' : 'Recipient Address'}
        </div>
        <WalletInfo name={counterPartyName} address={counterPartyAddress} />
      </div>

      {/* transaction amount */}
      <div className="flex flex-col items-end justify-start gap-4 lg:justify-center lg:gap-2 lg:pr-10 xl:pr-12">
        <div className="text-foreground/50 text-xs/4.5">Amount</div>
        <div
          className={cn(
            'flex items-baseline gap-1 text-sm/5.5 font-semibold',
            isIncomingTransaction && !!highlightPositiveAmounts
              ? 'text-status-success'
              : 'text-foreground',
          )}
        >
          <span>{isIncomingTransaction ? '+' : '-'}</span>
          {usLocalizedNumber(amount)}
          <span className="text-foreground/30 text-xs/4.5 font-medium">USD</span>
        </div>
      </div>
    </div>
  )
}

export { DesktopTransaction }
