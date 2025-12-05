'use client'

import { InfoIcon } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/modules/shared/components/ui/accordion'
import { Separator } from '@/modules/shared/components/ui/separator'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/modules/shared/components/ui/tooltip'
import { usLocalizedNumber } from '@/modules/shared/lib/humanization'
import type { ExpenseComparisonLineItem } from '../../types'

interface ExpenseComparisonMobileProps {
  lineItems: ExpenseComparisonLineItem[]
}

function ExpenseComparisonContent({
  item,
  hasOffChain,
}: {
  item: ExpenseComparisonLineItem
  hasOffChain: boolean
}) {
  return (
    <div className="px-4 pb-4">
      {/* Reported Actuals */}
      <div className="flex items-center justify-between py-2">
        <span className="text-foreground/50 text-xs/4.5">Reported Actuals</span>
        <span className="text-foreground text-sm/5.5 font-semibold">
          {usLocalizedNumber(item.reportedActuals, 2)} USD
        </span>
      </div>

      <Separator className="my-2" />

      {/* Net Expense Transactions Header */}
      <div className="text-foreground py-2 text-center text-sm font-semibold">
        Net Expense Transactions
      </div>

      {/* On-chain only */}
      <div className="flex items-center justify-between py-1">
        <div className="flex items-center gap-1">
          <span className="text-foreground/50 text-xs/4.5">On-chain only</span>
          <Tooltip>
            <TooltipTrigger asChild>
              <InfoIcon className="text-foreground/50 size-3.5" />
            </TooltipTrigger>
            <TooltipContent side="bottom" align="start" className="max-w-70">
              Net expense transactions from on-chain data only.
            </TooltipContent>
          </Tooltip>
        </div>
        <span className="text-foreground text-sm/5.5 font-semibold">
          {usLocalizedNumber(item.onChainOnly, 2)} USD
        </span>
      </div>

      {/* On-chain Difference */}
      <div className="flex items-center justify-between py-1">
        <span className="text-foreground/50 text-xs/4.5">Difference</span>
        <span className="text-foreground text-sm/5.5 font-semibold">
          {usLocalizedNumber(item.onChainDifference, 2)}%
        </span>
      </div>

      {/* Off-chain Section */}
      {hasOffChain && item.offChainIncluded !== undefined && (
        <>
          <Separator className="my-2" />
          <div className="flex items-center justify-between py-1">
            <div className="flex items-center gap-1">
              <span className="text-foreground/50 text-xs/4.5">Including off-chain</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <InfoIcon className="text-foreground/50 size-3.5" />
                </TooltipTrigger>
                <TooltipContent side="bottom" align="start" className="max-w-70">
                  Net expense transactions including both on-chain and off-chain data.
                </TooltipContent>
              </Tooltip>
            </div>
            <span className="text-foreground text-sm/5.5 font-semibold">
              {usLocalizedNumber(item.offChainIncluded, 2)} USD
            </span>
          </div>

          <div className="flex items-center justify-between py-1">
            <span className="text-foreground/50 text-xs/4.5">Difference</span>
            <span className="text-foreground text-sm/5.5 font-semibold">
              {item.offChainDifference !== undefined
                ? `${usLocalizedNumber(item.offChainDifference, 2)}%`
                : '-'}
            </span>
          </div>
        </>
      )}
    </div>
  )
}

function ExpenseComparisonMobile({ lineItems }: ExpenseComparisonMobileProps) {
  if (!lineItems.length) return null

  const hasOffChain = lineItems.some((item) => item.offChainIncluded !== undefined)
  const [firstItem, ...restItems] = lineItems

  return (
    <div className="space-y-2">
      {/* First Item - Always Expanded */}
      <div className="bg-background rounded-lg border">
        <div className="px-4 py-4 text-sm font-semibold">
          {firstItem.isTotals ? '3 Month Totals' : firstItem.month}
        </div>
        <ExpenseComparisonContent item={firstItem} hasOffChain={hasOffChain} />
      </div>

      {/* Remaining Items - Accordion */}
      {restItems.length > 0 && (
        <Accordion type="multiple" className="space-y-2">
          {restItems.map((item, index) => {
            const id = item.isTotals ? `totals-${index}` : item.month

            return (
              <AccordionItem
                key={id}
                value={id}
                className="bg-background rounded-lg border last:border-b"
              >
                <AccordionTrigger className="px-4 py-4 text-sm font-semibold hover:no-underline">
                  {item.isTotals ? '3 Month Totals' : item.month}
                </AccordionTrigger>
                <AccordionContent className="p-0">
                  <ExpenseComparisonContent item={item} hasOffChain={hasOffChain} />
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>
      )}
    </div>
  )
}

export { ExpenseComparisonMobile }
