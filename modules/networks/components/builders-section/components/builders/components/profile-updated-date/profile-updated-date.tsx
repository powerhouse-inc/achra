import { useMemo } from 'react'
import { Skeleton } from '@/modules/shared/components/ui/skeleton'

type ProfileUpdatedDateProps<E extends React.ElementType> = React.ComponentProps<E> & {
  as?: E
  lastModified: string
}

function ProfileUpdatedDate<E extends React.ElementType = 'span'>({
  as,
  lastModified,
  ...props
}: ProfileUpdatedDateProps<E>) {
  const Element = as ?? 'span'
  const profileUpdateDate = useMemo(() => {
    if (lastModified?.isValid) {
      return lastModified.toUTC().toFormat('dd.MM.yyyy')
    }
    return 'No data'
  }, [lastModified])

  return <Element {...props}>{profileUpdateDate}</Element>
}

function ProfileUpdatedDateSkeleton() {
  return <Skeleton className="h-5.5 w-19" />
}

export { ProfileUpdatedDate, ProfileUpdatedDateSkeleton }
