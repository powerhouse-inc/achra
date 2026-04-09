'use client'

import { utc } from '@date-fns/utc'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { format, parseISO } from 'date-fns'
import { useId } from 'react'
import { AccountTransactionDirection } from '@/modules/__generated__/graphql/switchboard-generated'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from '@/modules/shared/components/ui/accordion'
import { Separator } from '@/modules/shared/components/ui/separator'
import { usLocalizedNumber } from '@/modules/shared/lib/humanization'
import { cn } from '@/modules/shared/lib/utils'
import { TxHash } from '../tx-hash'
import { ExpenseArrow } from './expense-arrow'
import { WalletInfo } from './wallet-info'
import type { TransactionProps } from './transaction'

interface MobileTransactionProps extends TransactionProps {
  // prop to allow the component to be expanded by default (used in the storybook)
  defaultExpanded?: boolean
}

function MobileTransaction({
  label,
  date,
  toDate,
  txHash,
  counterPartyName,
  counterPartyAddress,
  amount,
  defaultExpanded = false,
  highlightPositiveAmounts,
  direction,
}: MobileTransactionProps) {
  const id = useId()
  const isIncomingTransaction = direction === AccountTransactionDirection.Inflow
  const formattedDate = toDate ? (
    <>
      from {format(parseISO(date), 'dd-MMM-yyyy', { in: utc })}
      <br />
      to {format(parseISO(toDate), 'dd-MMM-yyyy', { in: utc })}
    </>
  ) : (
    `${format(parseISO(date), 'dd-MMM-yyyy HH:mm', { in: utc })} UTC`
  )

  return (
    <Accordion type="single" collapsible defaultChecked={defaultExpanded}>
      <AccordionItem value={id} className="bg-background rounded-lg">
        <AccordionPrimitive.Header className="flex">
          <AccordionPrimitive.Trigger
            data-slot="accordion-trigger"
            className={cn(
              'focus-visible:border-ring focus-visible:ring-ring/50 group relative flex flex-1 transition-all outline-none focus-visible:ring-[3px]',
              'p-2 data-[state=open]:pb-0',
            )}
          >
            <div className="pt-2 pr-2">
              <ExpenseArrow isIncoming={isIncomingTransaction} isSwap={label === 'Swap'} />
            </div>
            <div className="flex w-full items-start justify-between">
              <div className="flex flex-col text-left text-xs/4.5 font-medium">
                <div>{label}</div>
                <div className="text-foreground/30">{formattedDate}</div>
              </div>
              <div
                className={cn(
                  'flex items-baseline justify-end gap-1 pt-1 text-sm/5.5 font-semibold',
                  amount > 0 && !!highlightPositiveAmounts
                    ? 'text-status-success'
                    : 'text-foreground',
                )}
              >
                <span>{isIncomingTransaction ? '+' : '-'}</span>
                {usLocalizedNumber(amount)}
                <span className="text-foreground/30 text-xs/4.5 font-medium">USD</span>
              </div>
            </div>

            <div className="bg-accent absolute top-0 right-0 flex size-4 items-center justify-center rounded-tr-lg rounded-br-lg">
              <span
                data-sign-state="collapsed"
                className="group-data-[state=closed]:inline-block group-data-[state=open]:hidden"
              >
                +
              </span>
              <span
                data-sign-state="expanded"
                className="group-data-[state=closed]:hidden group-data-[state=open]:inline-block"
              >
                -
              </span>
            </div>
          </AccordionPrimitive.Trigger>
        </AccordionPrimitive.Header>
        <AccordionContent className="p-0">
          <div className="pl-8">
            <TxHash txHash={txHash} />
          </div>
          <div className="px-2 pb-2">
            <Separator className="my-2" />

            <div className="flex justify-between pr-4 pb-2 pl-2">
              <div className="text-foreground/50 flex items-center justify-center pr-3.5 text-xs/4.5 font-medium">
                {isIncomingTransaction ? 'Sender Address' : 'Recipient Address'}
              </div>
              <WalletInfo name={counterPartyName} address={counterPartyAddress} />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export { MobileTransaction }
