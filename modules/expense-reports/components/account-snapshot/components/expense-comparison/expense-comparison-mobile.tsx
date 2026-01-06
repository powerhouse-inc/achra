'use client'

import { InfoIcon } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/modules/shared/components/ui/accordion'
import { Card, CardContent } from '@/modules/shared/components/ui/card'
import { Separator } from '@/modules/shared/components/ui/separator'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/modules/shared/components/ui/tooltip'
import { usLocalizedNumber } from '@/modules/shared/lib/humanization'
import type { ExpenseComparisonLineItem } from '../../types'

interface ExpenseComparisonMobileProps {
  lineItems: ExpenseComparisonLineItem[]
}

function ExpenseComparisonLabel({ children }: { children: React.ReactNode }) {
  return <span className="text-foreground/30 text-base/6 font-semibold">{children}</span>
}

function ExpenseComparisonValue({ children }: { children: React.ReactNode }) {
  return <span className="text-foreground/50 text-sm/5.5 font-semibold">{children}</span>
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
        <ExpenseComparisonLabel>Reported Actuals</ExpenseComparisonLabel>
        <ExpenseComparisonValue>
          {usLocalizedNumber(item.reportedActuals, 2)} USD
        </ExpenseComparisonValue>
      </div>

      {/* Net Expense Transactions Header */}
      <div className="text-foreground pb-2 text-center text-sm/5.5 font-semibold">
        Net Expense Transactions
      </div>

      <div className="-mx-2 flex flex-col gap-1 rounded-lg border p-2">
        {/* On-chain only */}
        <div className="flex items-center justify-between py-1">
          <div className="flex items-center gap-1">
            <ExpenseComparisonLabel>On-chain only</ExpenseComparisonLabel>
            <Tooltip>
              <TooltipTrigger asChild>
                <InfoIcon className="text-foreground/30 size-4" />
              </TooltipTrigger>
              <TooltipContent side="bottom" align="start" className="max-w-70">
                Net expense transactions from on-chain data only.
              </TooltipContent>
            </Tooltip>
          </div>
          <ExpenseComparisonValue>
            {usLocalizedNumber(item.onChainOnly, 2)} USD
          </ExpenseComparisonValue>
        </div>

        <div className="-mx-2">
          <Separator className="border-accent border" />
        </div>

        {/* On-chain Difference */}
        <div className="flex items-center justify-between py-1">
          <ExpenseComparisonLabel>Difference</ExpenseComparisonLabel>
          <ExpenseComparisonValue>
            {usLocalizedNumber(item.onChainDifference, 2)}%
          </ExpenseComparisonValue>
        </div>

        {/* Off-chain Section */}
        {hasOffChain && item.offChainIncluded !== undefined && (
          <>
            <div className="-mx-2">
              <Separator />
            </div>
            <div className="flex items-center justify-between py-1">
              <div className="flex items-center gap-1">
                <ExpenseComparisonLabel>Including off-chain</ExpenseComparisonLabel>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <InfoIcon className="text-foreground/30 size-4" />
                  </TooltipTrigger>
                  <TooltipContent side="bottom" align="start" className="max-w-70">
                    Net expense transactions including both on-chain and off-chain data.
                  </TooltipContent>
                </Tooltip>
              </div>
              <ExpenseComparisonValue>
                {usLocalizedNumber(item.offChainIncluded, 2)} USD
              </ExpenseComparisonValue>
            </div>

            <div className="-mx-2">
              <Separator className="border-accent border" />
            </div>

            <div className="flex items-center justify-between py-1">
              <ExpenseComparisonLabel>Difference</ExpenseComparisonLabel>
              <ExpenseComparisonValue>
                {item.offChainDifference !== undefined
                  ? `${usLocalizedNumber(item.offChainDifference, 2)}%`
                  : '-'}
              </ExpenseComparisonValue>
            </div>
          </>
        )}
      </div>
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
      <Card className="gap-2 border-none py-2">
        <CardContent className="px-0">
          <div className="px-4 text-sm/5.5 font-semibold">
            {firstItem.isTotals ? '3 Month Totals' : firstItem.month}
          </div>

          <ExpenseComparisonContent item={firstItem} hasOffChain={hasOffChain} />
        </CardContent>
      </Card>

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
