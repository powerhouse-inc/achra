import { cn } from '@/modules/shared/lib/utils'
import type { SummaryServiceRow } from '../../../utils'

interface LineItemProps {
  row: SummaryServiceRow
}

export function LineItem({ row }: Readonly<LineItemProps>) {
  const renderValue = () => {
    switch (row.valueType) {
      case 'symbol':
        return <span className="text-foreground text-sm/5.5 font-semibold lg:text-base/6">~</span>
      case 'check':
        return (
          <span className="text-status-success text-sm/5.5 font-semibold lg:text-base/6">✓</span>
        )
      case 'none':
        return (
          <span className="text-muted-foreground text-sm/5.5 font-semibold lg:text-base/6">—</span>
        )
      case 'label':
        return (
          <span className="text-muted-foreground text-sm/5.5 font-medium tracking-wider uppercase lg:text-base/6">
            {row.displayValue}
          </span>
        )
      case 'price':
      default:
        return (
          <span className="text-foreground text-sm/5.5 font-semibold lg:text-base/6">
            {row.displayValue}
          </span>
        )
    }
  }

  return (
    <div
      className={cn(
        'flex items-center justify-between px-3 lg:px-6',
        row.sublabel && 'items-start',
      )}
    >
      <div className="flex flex-col gap-0.5">
        <span className="text-foreground text-sm/5.5 lg:text-base/6">{row.label}</span>
        {row.sublabel && <span className="text-foreground/50 text-xs">{row.sublabel}</span>}
      </div>
      {renderValue()}
    </div>
  )
}
