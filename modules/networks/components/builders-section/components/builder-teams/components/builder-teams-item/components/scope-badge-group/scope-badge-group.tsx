import { BuildersScopesChip } from '@/modules/shared/components/chips/builders-scopes-chip'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/modules/shared/components/ui/tooltip'
import type { Scope } from '@/modules/shared/types/scopes'

export interface ScopeBadgeGroupProps {
  items: Scope[]
}

export default function ScopeBadgeGroup({ items }: ScopeBadgeGroupProps) {
  return (
    <Tooltip>
      <TooltipTrigger>
        <div className="grid grid-cols-2 gap-1">
          {items.map((scope: Scope) => (
            <BuildersScopesChip key={scope.id} scope={scope} size="medium" />
          ))}
        </div>
      </TooltipTrigger>
      <TooltipContent side="bottom" align="start">
        <div className="flex flex-col gap-1">
          {items.map((scope) => (
            <BuildersScopesChip key={scope.id} scope={scope} size="large" />
          ))}
        </div>
      </TooltipContent>
    </Tooltip>
  )
}
