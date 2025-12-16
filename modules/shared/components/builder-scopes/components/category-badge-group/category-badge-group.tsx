import { BuildersCategoryChip } from '@/modules/shared/components/chips/builders-category-chip'
import {
  HoverPopover,
  HoverPopoverContent,
  HoverPopoverTrigger,
} from '@/modules/shared/components/hover-popover'
import type { TeamCategory } from '@/modules/shared/types/types'
export interface CategoryBadgeGroupProps {
  items: TeamCategory[]
}

export default function CategoryBadgeGroup({ items }: CategoryBadgeGroupProps) {
  return (
    <HoverPopover>
      <HoverPopoverTrigger asChild>
        <div className="grid grid-cols-2 gap-1">
          {items.map((category: TeamCategory) => (
            <BuildersCategoryChip key={category} category={category} />
          ))}
        </div>
      </HoverPopoverTrigger>
      <HoverPopoverContent className="w-fit p-2" align="start">
        <div className="flex flex-col gap-1">
          {items.map((category) => (
            <BuildersCategoryChip key={category} category={category} />
          ))}
        </div>
      </HoverPopoverContent>
    </HoverPopover>
  )
}
