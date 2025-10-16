import { Badge } from '@/modules/shared/components/ui/badge'
import { cn } from '@/modules/shared/lib/utils'
import type { TeamCategory } from '@/modules/shared/types/types'
import { useCategoryBadge } from './use-category-badge'

interface CategoryBadgeProps {
  category: TeamCategory
  className?: string
}

export default function CategoryBadge({ category, className }: CategoryBadgeProps) {
  const { categoryBadgeStyles } = useCategoryBadge()

  return (
    <Badge
      variant="outline"
      className={cn(
        categoryBadgeStyles[category],
        'text-foreground/50 border-2 px-4 py-0 text-sm/5.5 font-semibold',
        className,
      )}
    >
      {category}
    </Badge>
  )
}
