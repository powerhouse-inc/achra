import { TeamCategory } from '@/modules/shared/types/types'
import type { ClassValue } from 'clsx'

export type CategoryBadgeStyles = Record<TeamCategory, ClassValue>

const categoryBadgeStyles: CategoryBadgeStyles = {
  [TeamCategory.Technical]: 'border-status-progress/30',
  [TeamCategory.Support]: 'border-to-do/30',
  [TeamCategory.Operational]: 'border-primary/30',
  [TeamCategory.Business]: 'border-status-success/30',
  [TeamCategory.RWAs]: 'border-purple/30',
  [TeamCategory.Growth]: 'border-destructive/30',
  [TeamCategory.Finance]: 'border-status-progress/30',
  [TeamCategory.Legal]: 'border-status-success/30',
  [TeamCategory.ScopeFacilitator]: 'border-yellow/30',
  [TeamCategory.All]: 'border-muted',
}

export const useCategoryBadge = () => {
  return { categoryBadgeStyles }
}
