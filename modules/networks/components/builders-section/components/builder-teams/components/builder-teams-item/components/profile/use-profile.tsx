import { useMemo } from 'react'
import { TeamStatus } from '@/modules/shared/types/types'
import type { ClassValue } from 'clsx'

export type StatusBadgeStyles = Record<TeamStatus, ClassValue>

export const useProfile = () => {
  const statusBadgeStyles = useMemo<StatusBadgeStyles>(
    () => ({
      [TeamStatus.Progress]: 'text-status-progress bg-status-progress/30',
      [TeamStatus['To Do']]: 'text-to-do bg-to-do/30',
      [TeamStatus.Canceled]: 'text-destructive bg-destructive/30',
      [TeamStatus.Accepted]: 'text-status-success bg-status-success/30',
      [TeamStatus.Obsolete]: 'text-muted-foreground bg-muted',
    }),
    [],
  )

  return { statusBadgeStyles }
}
