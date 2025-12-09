import { Card } from '@/modules/shared/components/ui/card'
import { cn } from '@/modules/shared/lib/utils'

function MetricCard({ children, className, ...props }: React.ComponentProps<typeof Card>) {
  return (
    <Card
      className={cn(
        'bg-popover relative flex w-full flex-col justify-between gap-0 border px-4 py-2 shadow-none',
        className,
      )}
      {...props}
    >
      <div className="flex items-start justify-between gap-2">{children}</div>
    </Card>
  )
}

interface MetricCardLabelProps extends React.ComponentProps<'div'> {
  children: React.ReactNode
}

function MetricCardLabel({ children, className, ...props }: MetricCardLabelProps) {
  return (
    <div className={cn('text-card-foreground text-xs font-medium', className)} {...props}>
      {children}
    </div>
  )
}

export { MetricCard, MetricCardLabel }
