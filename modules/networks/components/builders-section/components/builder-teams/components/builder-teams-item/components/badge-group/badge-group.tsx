import { BuildersScopesChip } from '@/modules/shared/components/chips/builders-scopes-chip'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/modules/shared/components/ui/tooltip'
import type { Scope } from '@/modules/shared/types/scopes'
import type { TeamCategory } from '@/modules/shared/types/types'
import CategoryBadge from '../category-badge/category-badge'

export interface BadgeGroupProps {
  items: Scope[] | TeamCategory[]
}

export default function BadgeGroup({ items }: BadgeGroupProps) {
  const isScope = (item: Scope | TeamCategory): item is Scope => typeof item !== 'string'

  return (
    <Tooltip>
      <TooltipTrigger>
        {isScope(items[0]) ? (
          <BuildersScopesChip key={items[0].id} scope={items[0]} size="large" />
        ) : (
          <div className="flex flex-col gap-1">
            <CategoryBadge category={items[0]} />
            <CategoryBadge category={items[1] as TeamCategory} />
          </div>
        )}
      </TooltipTrigger>
      <TooltipContent side="bottom" align="start">
        <div className="flex flex-col gap-1">
          {items.map((scope) =>
            isScope(scope) ? (
              <BuildersScopesChip key={scope.id} scope={scope} size="large" />
            ) : (
              <CategoryBadge key={scope} category={scope} />
            ),
          )}
        </div>
      </TooltipContent>
    </Tooltip>
  )
}
