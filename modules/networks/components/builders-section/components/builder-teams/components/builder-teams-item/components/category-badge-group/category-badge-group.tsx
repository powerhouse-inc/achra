import { Tooltip, TooltipContent, TooltipTrigger } from '@/modules/shared/components/ui/tooltip'
import type { TeamCategory } from '@/modules/shared/types/types'
import CategoryBadge from '../category-badge/category-badge'

export interface CategoryBadgeGroupProps {
  items: TeamCategory[]
}

export default function CategoryBadgeGroup({ items }: CategoryBadgeGroupProps) {
  return (
    <Tooltip>
      <TooltipTrigger>
        <div className="grid grid-cols-2 gap-1">
          {items.map((category: TeamCategory) => (
            <CategoryBadge key={category} category={category} />
          ))}
        </div>
      </TooltipTrigger>
      <TooltipContent side="bottom" align="start">
        <div className="flex flex-col gap-1">
          {items.map((category) => (
            <CategoryBadge key={category} category={category} />
          ))}
        </div>
      </TooltipContent>
    </Tooltip>
  )
}
