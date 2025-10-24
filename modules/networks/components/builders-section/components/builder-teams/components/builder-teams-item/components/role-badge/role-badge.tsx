import { Badge } from '@/modules/shared/components/ui/badge'
import { cn } from '@/modules/shared/lib/utils'
import { ResourceType } from '@/modules/shared/types/types'

export interface RoleBadgeProps {
  type: ResourceType
  className?: string
}

export default function RoleBadge({ type, className }: RoleBadgeProps) {
  const badgeLabel = type === ResourceType.EcosystemActor ? 'Active Ecosystem Actor' : 'Core Unit'
  return (
    <Badge
      variant="default"
      className={cn(
        'border-border bg-muted text-muted-foreground flex justify-self-end border-0 border-b px-1 py-0 text-sm/5.5 font-semibold',
        className,
      )}
    >
      {badgeLabel}
    </Badge>
  )
}
