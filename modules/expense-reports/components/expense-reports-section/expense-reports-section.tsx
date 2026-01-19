import { ExternalLinkIcon } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/modules/shared/components/ui/button'
import { ExpenseReportsActuals } from '../expense-reports-actuals'

interface ExpenseReportsSectionProps {
  month: Date | null
}

async function ExpenseReportsSection({ month }: ExpenseReportsSectionProps) {
  // simulate api call
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return (
    <div className="flex flex-col gap-4">
      <div className="container">
        {/* TODO: replace this text once the new one is provided */}
        <Button variant="link" asChild className="text-foreground">
          <Link href="#" target="_blank">
            CES Core Unit on-chain transaction history <ExternalLinkIcon />
          </Link>
        </Button>
      </div>

      <div className="bg-accent pt-2 pb-6 shadow-sm">
        <div className="container">
          <ExpenseReportsActuals month={month} />
        </div>
      </div>
    </div>
  )
}

export { ExpenseReportsSection }
