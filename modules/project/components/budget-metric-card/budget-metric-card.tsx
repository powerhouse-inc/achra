import { cn } from '@/modules/shared/lib/utils'
import { MetricCard, MetricCardLabel } from '../metric-card/metric-card'

interface BudgetMetricCardProps {
  value?: number
  unit?: string
}

function BudgetMetricCard({ value, unit }: BudgetMetricCardProps) {
  return (
    <MetricCard>
      <div className="w-full space-y-1">
        <MetricCardLabel>Budget</MetricCardLabel>
        <div className="flex w-full justify-between">
          <div className="flex items-baseline gap-2">
            <p className={cn('text-base font-semibold tracking-tight')}>{value ?? 'N/A'}</p>
            {unit && <span className="text-foreground/50 text-base font-semibold">{unit}</span>}
          </div>

          <div className={cn('flex items-end')}>
            <span className="text-muted-foreground text-xs uppercase">CAPEX</span>
          </div>
        </div>
      </div>
    </MetricCard>
  )
}

export { BudgetMetricCard }
