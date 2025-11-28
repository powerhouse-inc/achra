import { useMemo } from 'react'
import { getProfileUpdateDate } from '@/modules/shared/lib/get-profile-update-date'
import { cn } from '@/modules/shared/lib/utils'
import type { Team } from '@/modules/shared/types/team'

export interface LastModifiedProps {
  team: Team
  isMobile?: boolean
  className?: string
}

export function LastModified({ team, isMobile, className }: LastModifiedProps) {
  const formattedDate = useMemo(() => {
    const date = getProfileUpdateDate(team)
    if (date?.isValid) {
      return date.toUTC().toFormat('dd-MMM-yyyy').toUpperCase()
    }
    return 'No data'
  }, [team])

  const relativeDate = useMemo(() => {
    const date = getProfileUpdateDate(team)
    if (date?.isValid) {
      const relative = date.toRelative({ style: 'long' })
      return relative ?? 'No data'
    }
    return 'No data'
  }, [team])

  return (
    <div
      className={cn(
        'flex flex-col gap-2',
        isMobile && 'w-full flex-row items-center justify-between',
        className,
      )}
    >
      <span
        className={cn('text-foreground/30 text-xs/4.5', isMobile && 'text-foreground font-medium')}
      >
        {isMobile ? 'Last modified' : formattedDate}
      </span>
      <span
        className={cn(
          'text-foreground text-sm/5.5 font-semibold capitalize',
          isMobile && 'text-foreground/50 text-xs/4.5 font-medium md:text-sm/5.5 md:font-semibold',
        )}
      >
        {relativeDate}
      </span>
    </div>
  )
}
