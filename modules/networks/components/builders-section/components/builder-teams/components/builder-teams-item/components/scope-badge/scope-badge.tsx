import { Badge } from '@/modules/shared/components/ui/badge'
import { cn } from '@/modules/shared/lib/utils'
import type { Scope } from '@/modules/shared/types/scopes'
import { type ScopeSizeVariant, useScopeBadge } from './use-scope-badge'

interface ScopeBadgeProps {
  scope: Scope
  className?: string
  size?: ScopeSizeVariant
}

export default function ScopeBadge({ scope, className, size = 'large' }: ScopeBadgeProps) {
  const { renderValue, scopeBadgeStyles } = useScopeBadge({ size, scope })

  return (
    <Badge
      variant="outline"
      className={cn(
        scopeBadgeStyles[scope.name],
        'box-border border-2',
        size === 'small' && 'h-6 w-8.5 text-xs/4.5 font-medium',
        size === 'medium' && 'px-2 py-0 text-sm/5.5 font-semibold',
        size === 'large' && 'h-6 px-1.5 py-0.25 text-sm/5.5 font-semibold',
        size === 'extraLarge' && 'px-2 py-1 text-sm/5.5 font-semibold',
        className,
      )}
    >
      {renderValue}
    </Badge>
  )
}
