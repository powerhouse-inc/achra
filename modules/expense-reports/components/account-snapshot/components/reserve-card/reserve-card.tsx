import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { ChevronDownIcon } from 'lucide-react'
import {
  isOperationalGroup,
  type ReserveAccount,
} from '@/modules/expense-reports/components/account-snapshot/reserve-account-types'
import { getBalance } from '@/modules/expense-reports/components/account-snapshot/utils/balance'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from '@/modules/shared/components/ui/accordion'
import { cn } from '@/modules/shared/lib/utils'
import { WalletInfo } from '../transaction/wallet-info'
import { TransactionList } from '../transaction-list'
import { KeyValuePair } from './key-value-pair'
import type { Token } from '../../types'

interface ReserveCardProps {
  account: ReserveAccount
  currency?: Token

  // intended to be use in the stories
  defaultExpanded?: boolean
}

function ReserveCard({ account, currency, defaultExpanded = false }: ReserveCardProps) {
  const isGroup = isOperationalGroup(account)
  const id = account.id
  const balance = isGroup ? account.balance : getBalance(account)
  const hasTransactions = isGroup ? account.children.length > 0 : account.transactions.length > 0
  const displayName = isGroup ? account.label : account.name

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
            <div
              role="button"
              aria-label={`Open reserve card ${displayName}`}
              className="bg-popover flex flex-col gap-2 rounded-xl px-6 pt-2 pb-4 shadow-lg md:flex-row md:gap-0 md:px-0 md:py-2"
            >
              {/* name area */}
              <div
                className={cn(
                  'flex w-full items-center justify-between md:w-42 md:min-w-42 md:px-2 lg:w-70 lg:min-w-70 lg:px-4',
                  {
                    'py-2.5': isGroup,
                  },
                )}
              >
                {isGroup ? (
                  <div className="text-popover-foreground text-sm/5.5 font-semibold lg:text-base/6">
                    {account.label}
                  </div>
                ) : (
                  <div>
                    <WalletInfo name={account.name || 'N/A'} address={account.address || 'N/A'} />
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
                value={balance.startingBalance}
                currency={currency}
                className={cn('mt-2', 'md:mt-0 md:w-25 lg:w-40 lg:min-w-40 xl:w-50 xl:min-w-50')}
              />

              {/* inflow */}
              <KeyValuePair
                label="Inflow"
                variant="outline"
                value={balance.inflow}
                currency={currency}
                className={cn('md:w-full')}
              />

              {/* outflow */}
              <KeyValuePair
                label="Outflow"
                variant="outline"
                value={balance.outflow}
                currency={currency}
                className={cn('md:w-full')}
              />

              {/* new balance */}
              <KeyValuePair
                label="New Balance"
                value={balance.endingBalance}
                currency={currency}
                className={cn('md:w-full md:items-end')}
              />

              <div className="hidden w-12 items-center justify-center px-2 py-4.5 md:flex md:px-4 lg:w-16 lg:min-w-16 xl:w-26 xl:min-w-26">
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
            <TransactionList items={isGroup ? account.children : account.transactions} />
          </AccordionContent>
        )}
      </AccordionItem>
    </Accordion>
  )
}

export { ReserveCard }
