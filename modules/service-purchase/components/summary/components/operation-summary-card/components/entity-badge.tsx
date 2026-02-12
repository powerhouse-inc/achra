import { Badge } from '@/modules/shared/components/ui/badge'
import { cn } from '@/modules/shared/lib/utils'

interface EntityBadgeProps {
  children: React.ReactNode
  className?: string
}

export function EntityBadge({ children, className }: Readonly<EntityBadgeProps>) {
  return (
    <Badge
      variant="outline"
      className={cn(
        'h-6 rounded-md border-2 px-1 py-0! text-sm/5.5 font-semibold',
        'bg-purple/30 text-primary border-purple',
        className,
      )}
    >
      {children}
    </Badge>
  )
}
