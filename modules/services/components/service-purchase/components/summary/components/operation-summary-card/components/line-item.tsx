import { cn } from '@/modules/shared/lib/utils'
import { formatRowValue } from '../../../utils'
import { EntityBadge } from './entity-badge'
import type { FeatureRow, Plan } from '../../../../configure-services-purchase/components/types'

interface LineItemProps {
  row: FeatureRow
  selectedPlan: Plan
  setupFee?: number
}

export function LineItem({ row, selectedPlan, setupFee }: Readonly<LineItemProps>) {
  const value = row.values[selectedPlan]
  const { displayValue, valueType } = formatRowValue(
    value,
    row.showApproxSymbol,
    row.hasOneTimeFee,
    setupFee,
  )

  const renderValue = () => {
    switch (valueType) {
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
            {displayValue}
          </span>
        )
      case 'price':
      default:
        return (
          <span className="text-foreground text-sm/5.5 font-semibold lg:text-base/6">
            {displayValue}
          </span>
        )
    }
  }

  return (
    <div
      className={cn(
        'flex items-center justify-between px-3 lg:px-6',
        row.sublabel && row.sublabelVariant === 'badge' && 'items-start',
      )}
    >
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-2">
          <span className="text-foreground text-sm/5.5 lg:text-base/6">{row.label}</span>
          {row.sublabel && row.sublabelVariant === 'badge' && (
            <EntityBadge className="hidden lg:flex">{row.sublabel}</EntityBadge>
          )}
        </div>
        {row.sublabel && row.sublabelVariant !== 'badge' && (
          <span className="text-foreground/50 text-xs">{row.sublabel}</span>
        )}
        {row.hasOneTimeFee && <span className="text-foreground/50 text-xs">One-time fee</span>}
      </div>
      {renderValue()}
    </div>
  )
}
