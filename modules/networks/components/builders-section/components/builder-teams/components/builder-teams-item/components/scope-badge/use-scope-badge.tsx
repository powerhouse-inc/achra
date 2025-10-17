import { useMemo } from 'react'
import { TeamScopeEnum } from '@/modules/shared/enums/actorScopeEnum'
import type { Scope } from '@/modules/shared/types/scopes'
import type { ClassValue } from 'clsx'

export type ScopeSizeVariant = 'small' | 'medium' | 'large' | 'extraLarge'

export type ScopeBadgeStyles = Record<TeamScopeEnum, ClassValue>

export interface UseScopeBadgeProps {
  size?: ScopeSizeVariant
  scope: Scope
}

export const useScopeBadge = ({ size, scope }: UseScopeBadgeProps) => {
  const scopeBadgeStyles = useMemo<ScopeBadgeStyles>(
    () => ({
      [TeamScopeEnum.SupportScope]:
        'border-status-progress bg-status-progress/30 text-status-progress',
      [TeamScopeEnum.StabilityScope]: 'border-destructive bg-destructive/30 text-destructive',
      [TeamScopeEnum.AccessibilityScope]:
        'border-status-success bg-status-success/30 text-status-success',
      [TeamScopeEnum.ProtocolScope]: 'border-to-do bg-to-do/30 text-to-do',
      [TeamScopeEnum.GovernanceScope]: 'border-primary bg-primary/30 text-primary',
      [TeamScopeEnum.All]: 'border-muted-foreground bg-muted text-muted-foreground',
    }),
    [],
  )

  const renderValue = useMemo(() => {
    return size === 'small' || size === 'medium' ? scope.code : scope.name
  }, [size, scope])

  return { renderValue, scopeBadgeStyles }
}
