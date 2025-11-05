import { HoverPopover } from '@/modules/shared/components/hover-popover'
import type { TeamCategory } from '@/modules/shared/types/types'
import CategoryBadge from '../category-badge/category-badge'

export interface CategoryBadgeGroupProps {
  items: TeamCategory[]
}

export default function CategoryBadgeGroup({ items }: CategoryBadgeGroupProps) {
  return (
    <HoverPopover
      triggerProps={{ asChild: true }}
      contentProps={{ className: 'p-2 w-fit', align: 'start' }}
      trigger={
        <div className="grid grid-cols-2 gap-1">
          {items.map((category: TeamCategory) => (
            <CategoryBadge key={category} category={category} />
          ))}
        </div>
      }
    >
      <div className="flex flex-col gap-1">
        {items.map((category) => (
          <CategoryBadge key={category} category={category} />
        ))}
      </div>
    </HoverPopover>
  )
}
