import { useMemo } from 'react'
import { getProfileUpdateDate } from '@/modules/shared/lib/get-profile-update-date'
import type { Team } from '@/modules/shared/types/team'

export interface LastModifiedProps {
  team: Team
}

export function LastModified({ team }: LastModifiedProps) {
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
      return relative
        ? relative
            .split(' ')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
        : 'No data'
    }
    return 'No data'
  }, [team])

  return (
    <div className="flex flex-col gap-2">
      <span className="text-foreground/30 text-xs/4.5">{formattedDate}</span>
      <span className="text-foreground text-sm/5.5 font-semibold">{relativeDate}</span>
    </div>
  )
}
