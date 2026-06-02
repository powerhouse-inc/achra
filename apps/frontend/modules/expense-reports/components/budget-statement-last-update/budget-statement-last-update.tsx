import { utc } from '@date-fns/utc'
import { format, parseISO } from 'date-fns'

interface BudgetStatementLastUpdateProps {
  lastModifiedAtUtcIso?: string | null
}

function BudgetStatementLastUpdate({ lastModifiedAtUtcIso }: BudgetStatementLastUpdateProps) {
  if (!lastModifiedAtUtcIso) {
    return null
  }

  const date = parseISO(lastModifiedAtUtcIso)
  if (Number.isNaN(date.getTime())) {
    return null
  }

  const formatted = `${format(date, 'dd-MMM-yyyy HH:mm', { in: utc })} UTC`

  return (
    <div className="flex flex-col items-end">
      <span className="text-foreground text-xs/4.5 font-medium">LAST UPDATE</span>
      <time className="text-foreground/50 text-xs/4.5 font-normal" dateTime={date.toISOString()}>
        {formatted}
      </time>
    </div>
  )
}

export { BudgetStatementLastUpdate }
