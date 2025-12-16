import { useMemo } from 'react'
import { BuilderScope } from '@/modules/__generated__/graphql/switchboard-generated'
import { GenericChip } from '../generic-chip/generic-chip'

export type ScopeChipSizeVariant = 'small' | 'medium' | 'large'

interface BuildersScopesChipProps {
  scope: BuilderScope
  size?: ScopeChipSizeVariant
  className?: string
}

export default function BuildersScopesChip({
  scope,
  size = 'large',
  className,
}: BuildersScopesChipProps) {
  const chipLabel = useMemo(() => {
    return size === 'small' || size === 'medium' ? scope.slice(0, 3).toUpperCase() : scope
  }, [scope, size])

  const { label, color } = useMemo(() => {
    switch (scope) {
      case BuilderScope.Acc:
        return {
          label: 'Accessibility',
          color: 'blue',
        }
      case BuilderScope.GovernanceScope:
        return {
          label: 'Governance',
          color: 'red',
        }
      case BuilderScope.ProtocolScope:
        return {
          label: 'Protocol',
          color: 'green',
        }
      case BuilderScope.Sta:
        return {
          label: 'Stability',
          color: 'red',
        }
      case BuilderScope.StabilityScope:
        return {
          label: 'Stability',
          color: 'red',
        }
      case BuilderScope.Sup:
        return {
          label: 'Support',
          color: 'blue',
        }
      case BuilderScope.SupportScope:
        return {
          label: 'Support',
          color: 'blue',
        }
    }
  }, [scope])

  return (
    <GenericChip variant="bordered" color={color} className={className}>
      {size === 'small' || size === 'medium' ? chipLabel : label}
    </GenericChip>
  )
}
