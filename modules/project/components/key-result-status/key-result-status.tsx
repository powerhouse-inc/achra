import { cn } from '@/modules/shared/lib/utils'

interface KeyResultStatusChipProps {
  className?: string
}

export function KeyResultStatusChip({ className }: KeyResultStatusChipProps) {
  return (
    <div
      className={cn(
        'bg-muted text-muted-foreground w-fit rounded-md px-1.5 py-0.5 text-xs/4.5 font-medium text-nowrap uppercase',
        className,
      )}
    >
      TODO
    </div>
  )
}
