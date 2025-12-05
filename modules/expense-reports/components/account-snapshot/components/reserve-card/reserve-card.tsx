'use client'

import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { ChevronDownIcon } from 'lucide-react'
import { useId } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from '@/modules/shared/components/ui/accordion'
import { cn } from '@/modules/shared/lib/utils'
import { WalletInfo } from '../transaction/wallet-info'
import { TransactionList } from '../transaction-list'
import { KeyValuePair } from './key-value-pair'
import type { Token, UIReservesData } from '../../types'

interface ReserveCardProps {
  account: UIReservesData
  currency?: Token

  // intended to be use in the stories
  defaultExpanded?: boolean
}

function ReserveCard({ account, currency, defaultExpanded = false }: ReserveCardProps) {
  const id = useId()

  const isGroup = account.accountType === 'group'
  const initialBalance = account.snapshotAccountBalance[0]?.initialBalance ?? 0
  const inflow = account.snapshotAccountBalance[0]?.inflow ?? 0
  const outflow = account.snapshotAccountBalance[0]?.outflow
    ? account.snapshotAccountBalance[0]?.outflow * -1
    : account.snapshotAccountBalance[0]?.outflow
  const newBalance = account.snapshotAccountBalance[0]?.newBalance ?? 0

  const hasTransactions = isGroup
    ? !!account.children?.length
    : !!account.snapshotAccountTransaction.length

  return (
    <Accordion
      type="single"
      collapsible
      className="bg-transparent"
      defaultValue={defaultExpanded ? id : undefined}
    >
      <AccordionItem value={id} className="border-0">
        <AccordionPrimitive.Header className="flex">
          <AccordionPrimitive.Trigger
            data-slot="accordion-trigger"
            className={cn(
              'relative z-10 w-full rounded-xl',
              'focus-visible:ring-ring/50 focus-visible:border-ring outline-none focus-visible:ring-[3px]',
              '[&[data-state=open]_svg[data-type="icon"]]:rotate-180',
              { 'cursor-pointer': hasTransactions },
            )}
            asChild
          >
            <div className="bg-popover flex flex-col gap-2 rounded-xl px-6 pt-2 pb-4 shadow-lg md:flex-row md:py-2 md:pr-4 md:pl-2 lg:px-4">
              {/* name area */}
              <div className="flex w-full items-center justify-between pt-3 md:w-42 md:px-2 lg:w-50 lg:pl-4 xl:w-75">
                {isGroup ? (
                  <div className="text-popover-foreground text-sm/5.5 font-semibold">
                    {account.accountLabel}
                  </div>
                ) : (
                  <div>
                    <WalletInfo
                      name={account.accountLabel}
                      address={account.accountAddress ?? ''}
                    />
                  </div>
                )}
                <ChevronDownIcon
                  data-type="icon"
                  className="text-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200 md:hidden"
                />
              </div>

              {/* initial balance */}
              <KeyValuePair
                label="Initial Balance"
                value={initialBalance}
                currency={currency}
                className={cn(
                  isGroup ? 'mt-6' : 'mt-4',
                  'md:mt-0 md:w-[14%] md:px-0.5 md:py-3',
                  'lg:w-[18.6%] lg:px-4 lg:py-2',
                  'xl:w-[16.6%] 2xl:w-[17.3%]',
                )}
              />

              {/* inflow */}
              <KeyValuePair
                label="Inflow"
                variant="outline"
                value={inflow}
                currency={currency}
                className={cn(
                  'md:mt-0 md:w-[14%] md:px-0.5 md:py-3',
                  'lg:w-[18.6%] lg:px-4 lg:py-2',
                  'xl:w-[16.6%] 2xl:w-[17.3%]',
                )}
              />

              {/* outflow */}
              <KeyValuePair
                label="Outflow"
                variant="outline"
                value={outflow}
                currency={currency}
                className={cn(
                  'md:mt-0 md:w-[14%] md:px-0.5 md:py-3',
                  'lg:w-[18.6%] lg:px-4 lg:py-2',
                  'xl:w-[16.6%] 2xl:w-[17.3%]',
                )}
              />

              {/* new balance */}
              <KeyValuePair
                label="New Balance"
                value={newBalance}
                currency={currency}
                className={cn(
                  'md:mt-0 md:w-[14%] md:px-0.5 md:py-3',
                  'lg:w-[18.6%] lg:px-4 lg:py-2',
                  'xl:w-[16.6%] 2xl:w-[17.3%]',
                )}
              />

              <div className="hidden w-12 items-center px-2 py-4.5 md:flex lg:w-auto lg:px-4.75 lg:py-2">
                <ChevronDownIcon
                  data-type="icon"
                  className="text-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200"
                />
              </div>
            </div>
          </AccordionPrimitive.Trigger>
        </AccordionPrimitive.Header>
        {hasTransactions && (
          <AccordionContent>
            <TransactionList
              items={isGroup ? account.children : account.snapshotAccountTransaction}
            />
          </AccordionContent>
        )}
      </AccordionItem>
    </Accordion>
  )
}

export { ReserveCard }
