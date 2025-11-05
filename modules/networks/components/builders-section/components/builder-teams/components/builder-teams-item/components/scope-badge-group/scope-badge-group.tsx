import { BuildersScopesChip } from '@/modules/shared/components/chips/builders-scopes-chip'
import { HoverPopover } from '@/modules/shared/components/hover-popover'
import type { Scope } from '@/modules/shared/types/scopes'

export interface ScopeBadgeGroupProps {
  items: Scope[]
}

export default function ScopeBadgeGroup({ items }: ScopeBadgeGroupProps) {
  return (
    <HoverPopover
      triggerProps={{ asChild: true }}
      contentProps={{ className: 'p-2 w-fit', align: 'start' }}
      trigger={
        <div className="grid grid-cols-2 gap-1">
          {items.map((scope: Scope) => (
            <BuildersScopesChip key={scope.id} scope={scope} size="medium" />
          ))}
        </div>
      }
    >
      <div className="flex flex-col gap-1">
        {items.map((scope) => (
          <BuildersScopesChip key={scope.id} scope={scope} size="large" />
        ))}
      </div>
    </HoverPopover>
  )
}
