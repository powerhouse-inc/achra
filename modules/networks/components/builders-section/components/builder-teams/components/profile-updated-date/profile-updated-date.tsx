import { useMemo } from 'react'
import { getProfileUpdateDate } from '@/modules/networks/lib/get-profile-update-date'
import { Skeleton } from '@/modules/shared/components/ui/skeleton'
import type { Team } from '@/modules/shared/types/team'

type ProfileUpdatedDateProps<E extends React.ElementType> = React.ComponentProps<E> & {
  as?: E
  team: Team
}

function ProfileUpdatedDate<E extends React.ElementType = 'span'>({
  as,
  team,
  ...props
}: ProfileUpdatedDateProps<E>) {
  const Element = as ?? 'span'
  const profileUpdateDate = useMemo(() => {
    const date = getProfileUpdateDate(team)
    if (date?.isValid) {
      return date.toUTC().toFormat('dd.MM.yyyy')
    }
    return 'No data'
  }, [team])

  return <Element {...props}>{profileUpdateDate}</Element>
}

function ProfileUpdatedDateSkeleton() {
  return <Skeleton className="h-5.5 w-19" />
}

export { ProfileUpdatedDate, ProfileUpdatedDateSkeleton }
