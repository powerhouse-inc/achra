import { DateTime } from 'luxon'
import { useMemo } from 'react'
import { cn } from '@/modules/shared/lib/utils'

export interface LastModifiedProps {
  lastModified?: string | null
  isMobile?: boolean
  className?: string
}

export function LastModified({ lastModified, isMobile, className }: LastModifiedProps) {
  const parsedDate = useMemo(() => {
    if (!lastModified) return undefined
    const date = DateTime.fromISO(lastModified)
    return date.isValid ? date : undefined
  }, [lastModified])

  const formattedDate = useMemo(() => {
    if (parsedDate?.isValid) {
      return parsedDate.toUTC().toFormat('dd-MMM-yyyy').toUpperCase()
    }
    return 'No data'
  }, [parsedDate])

  const relativeDate = useMemo(() => {
    const relative = parsedDate?.toRelative({ style: 'long' })
    return relative ?? 'No data'
  }, [parsedDate])

  return (
    <div
      className={cn(
        'flex flex-col gap-2',
        isMobile && 'w-full flex-row items-center justify-between',
        className,
      )}
    >
      <span
        className={cn(
          'text-foreground/30 flex items-start text-xs/4.5',
          isMobile && 'text-foreground font-medium',
        )}
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
