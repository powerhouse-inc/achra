import type { ClassValue } from 'clsx'

export interface StatusBadgeStyles {
  Progress: ClassValue
  'To Do': ClassValue
  Canceled: ClassValue
  Accepted: ClassValue
  Obsolete: ClassValue
}

export const useBuilderTeamItem = () => {
  const statusBadgeStyles: StatusBadgeStyles = {
    Progress: 'text-status-progress bg-status-progress/30',
    'To Do': 'text-to-do bg-to-do/30',
    Canceled: 'text-destructive bg-destructive/30',
    Accepted: 'text-status-success bg-status-success/30',
    Obsolete: 'text-muted-foreground bg-muted',
  }

  return statusBadgeStyles
}
