import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/modules/shared/components/ui/accordion'
import { TransactionList } from '../transaction-list'
import type { SnapshotAccountTransaction } from '../../types'

interface TransactionHistoryProps {
  transactionHistory: SnapshotAccountTransaction[]
}

function TransactionHistory({ transactionHistory }: TransactionHistoryProps) {
  return (
    <Accordion type="single" collapsible className="bg-transparent">
      <AccordionItem value="transaction-history" className="border-0">
        <AccordionTrigger className="bg-popover relative z-10 flex w-full items-center justify-between rounded-lg p-2 shadow-lg hover:no-underline hover:opacity-80 [&>svg]:translate-y-0">
          <div className="text-popover-foreground text-sm/5.5 font-medium lg:text-base/6 lg:font-semibold">
            View Transaction History
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <TransactionList items={transactionHistory} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export { TransactionHistory }
