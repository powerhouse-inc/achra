import { utc } from '@date-fns/utc'
import { format, parseISO } from 'date-fns'
import { usLocalizedNumber } from '@/modules/shared/lib/humanization'
import { cn } from '@/modules/shared/lib/utils'
import { TxHash } from '../tx-hash'
import { ExpenseArrow } from './expense-arrow'
import { WalletInfo } from './wallet-info'
import type { TransactionProps } from './transaction'

function DesktopTransaction({
  name,
  date,
  toDate,
  amount,
  txHash,
  counterPartyName,
  counterPartyAddress,
  highlightPositiveAmounts = false,
}: TransactionProps) {
  const isIncomingTransaction = amount > 0
  const formattedDate = toDate
    ? `${format(parseISO(date), 'dd-MMM-yyyy', { in: utc })} to ${format(parseISO(toDate), 'dd-MMM-yyyy', { in: utc })}`
    : `${format(parseISO(date), 'dd-MMM-yyyy HH:mm', { in: utc })} UTC`

  return (
    <div
      className={cn(
        'grid py-[6px] pr-6 pb-[5px] pl-3',
        'grid-cols-[172px_15.7%_max-content_1fr]',
        'not-first-of-type:border-border not-first-of-type:border-t',
        'hover:bg-muted',
        'md:grid-cols-[150px_15.7%_max-content_1fr] md:py-[6px] md:pr-10 md:pb-[5px] md:pl-3',
        'lg:grid-cols-[218px_15.7%_max-content_1fr] lg:py-2 lg:pr-4 lg:pb-[7px] lg:pl-5',
        'xl:grid-cols-[275px_16.1%_max-content_1fr] xl:py-2 xl:pr-20 xl:pb-[7px] xl:pl-5',
        '2xl:grid-cols-[295px_16.4%_max-content_1fr]',
      )}
    >
      {/* transaction header */}
      <div className="col-span-2 flex gap-2 lg:gap-4">
        <ExpenseArrow isIncoming={isIncomingTransaction} className="mt-1.25 size-6 min-w-6" />
        <div className="flex flex-col">
          <div className="text-sm/5.5 font-medium">{name}</div>
          <div className="text-foreground/30 text-xs/4.5 uppercase">{formattedDate}</div>
          <TxHash txHash={txHash} />
        </div>
      </div>

      {/* transaction counter party */}
      <div className="flex flex-col gap-1 pr-2.5">
        <div className="text-foreground/50 text-xs/4.5">
          {isIncomingTransaction ? 'Sender Address' : 'Recipient Address'}
        </div>
        <WalletInfo name={counterPartyName} address={counterPartyAddress} />
      </div>

      {/* transaction amount */}
      <div className="flex flex-col items-end justify-start gap-4">
        <div className="text-foreground/50 text-xs/4.5">Amount</div>
        <div
          className={cn(
            'flex items-baseline gap-1 text-sm/5.5 font-semibold',
            isIncomingTransaction && !!highlightPositiveAmounts
              ? 'text-status-success'
              : 'text-foreground',
          )}
        >
          <span>{amount < 0 ? '-' : '+'}</span>
          {usLocalizedNumber(Math.abs(amount))}
          <span className="text-foreground/30 text-xs/4.5 font-medium">USD</span>
        </div>
      </div>
    </div>
  )
}

export { DesktopTransaction }
