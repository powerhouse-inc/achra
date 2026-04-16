import { Badge } from '@/modules/shared/components/ui/badge'
import { cn } from '@/modules/shared/lib/utils'
import { BADGE_CONFIG } from '../../lib/constants'
import type { ServiceBadge as ServiceBadgeType } from '../../types'

interface ServiceBadgeProps {
  badge: ServiceBadgeType
  className?: string
}

function ServiceBadge({ badge, className }: Readonly<ServiceBadgeProps>) {
  const config = BADGE_CONFIG[badge]

  return (
    <Badge
      variant="outline"
      className={cn('border-none text-xs font-medium', config.className, className)}
    >
      {config.label}
    </Badge>
  )
}

export { ServiceBadge }
