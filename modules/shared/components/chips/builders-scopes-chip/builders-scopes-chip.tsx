import { cva, type VariantProps } from 'class-variance-authority'
import { TeamScopeEnum } from '@/modules/shared/enums/actorScopeEnum'
import { cn } from '@/modules/shared/lib/utils'
import type { Scope } from '@/modules/shared/types/scopes'
import { Badge } from '../../ui/badge'

const buildersScopesChipVariants = cva('box-border border-2', {
  variants: {
    size: {
      small: 'h-6 w-8.5 p-0 text-xs/4.5 font-medium',
      medium: 'h-6 w-12 p-0 text-sm/5.5 font-semibold',
      large: 'h-6 px-1.5 py-0.25 text-sm/5.5 font-semibold',
      extraLarge: 'px-2 py-1 text-sm/5.5 font-semibold',
    },
    scope: {
      [TeamScopeEnum.SupportScope]:
        'border-status-progress bg-status-progress/30 text-status-progress',
      [TeamScopeEnum.StabilityScope]: 'border-destructive bg-destructive/30 text-destructive',
      [TeamScopeEnum.AccessibilityScope]:
        'border-status-success bg-status-success/30 text-status-success',
      [TeamScopeEnum.ProtocolScope]: 'border-to-do bg-to-do/30 text-to-do',
      [TeamScopeEnum.GovernanceScope]: 'border-primary bg-primary/30 text-primary',
      [TeamScopeEnum.All]: 'border-muted-foreground bg-muted text-muted-foreground',
    },
  },
  defaultVariants: {
    size: 'large',
    scope: TeamScopeEnum.SupportScope,
  },
})

type BuildersScopesChipVariants = VariantProps<typeof buildersScopesChipVariants>

export type ScopeSizeVariant = NonNullable<BuildersScopesChipVariants['size']>

interface BuildersScopesChipProps {
  scope: Scope
  size?: ScopeSizeVariant
  className?: string
}

export function BuildersScopesChip({ scope, size = 'large', className }: BuildersScopesChipProps) {
  const chipLabel =
    size === 'small' || size === 'medium' ? scope.name.slice(0, 3).toUpperCase() : scope.name

  return (
    <Badge
      variant="outline"
      className={cn(buildersScopesChipVariants({ size, scope: scope.name }), className)}
    >
      {chipLabel}
    </Badge>
  )
}

export { buildersScopesChipVariants }
