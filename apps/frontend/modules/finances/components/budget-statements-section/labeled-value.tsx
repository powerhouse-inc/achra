import { cn } from '@/modules/shared/lib/utils'

export interface LabeledValueProps {
  label: string
  value: string
  className?: string
}

function LabeledValue({ label, value, className }: LabeledValueProps) {
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <span className="text-foreground/30 text-sm/5.5 font-semibold">{label}</span>
      <span className="text-foreground text-sm/5.5 font-semibold">{value}</span>
    </div>
  )
}

export { LabeledValue }
