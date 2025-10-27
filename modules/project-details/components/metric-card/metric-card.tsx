import { Card } from '@/modules/shared/components/ui/card'
import { cn } from '@/shared/lib/utils'
import type { ReactNode } from 'react'

interface MetricCardProps {
  label: string
  value: ReactNode
  unit?: string
  footer?: ReactNode
  action?: ReactNode
  className?: string
}

export function MetricCard({ label, value, unit, footer, action, className }: MetricCardProps) {
  return (
    <Card
      className={cn('relative flex w-full flex-col justify-between gap-0 px-4 py-2', className)}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="w-full space-y-1">
          <p className={cn('text-card-foreground text-xs font-medium')}>{label}</p>
          <div className="flex w-full justify-between">
            <div className="flex items-baseline gap-2">
              <p className={cn('text-base font-semibold tracking-tight')}>{value}</p>
              {unit && <span className="text-foreground/50 text-base font-semibold">{unit}</span>}
            </div>

            {footer && (
              <div className={cn('flex items-end')}>
                <span className="text-muted-foreground text-xs uppercase">{footer}</span>
              </div>
            )}
          </div>
        </div>
        {action && <div className="flex self-center">{action}</div>}
      </div>
    </Card>
  )
}
