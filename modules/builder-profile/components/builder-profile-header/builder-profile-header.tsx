import { ExternalLinkIcon } from 'lucide-react'
import { DateTime } from 'luxon'
import { useMemo } from 'react'
import type { BuilderProfileState } from '@/modules/__generated__/graphql/switchboard-generated'
import { Links } from '@/modules/builders/components/builders/components/links/links'
import { BuildersStatusChip } from '@/modules/shared/components/chips/builders-status-chip'
import { Avatar, AvatarFallback, AvatarImage } from '@/modules/shared/components/ui/avatar'
import { Button } from '@/modules/shared/components/ui/button'
import ff from '@/modules/shared/lib/feature-flags'
import { cn } from '@/modules/shared/lib/utils'
import { BuilderProfileHeaderDescription } from './builder-profile-header-description'

interface BuilderProfileHeaderProps {
  builder: BuilderProfileState
  isOperatorProfile?: boolean
}

function BuilderProfileHeader({ builder, isOperatorProfile }: BuilderProfileHeaderProps) {
  const parsedDate = useMemo(() => {
    if (!builder.lastModified) return undefined
    const date = DateTime.fromISO(builder.lastModified)
    return date.isValid ? date : undefined
  }, [builder.lastModified])

  const formattedDate = useMemo(() => {
    if (parsedDate?.isValid) {
      return parsedDate.toUTC().toFormat('dd-MMM-yyyy').toUpperCase()
    }
    return 'No data'
  }, [parsedDate])

  return (
    <div className={cn('border-input mt-16 w-full border-b', isOperatorProfile && 'mt-3')}>
      <div className="container flex flex-col gap-2 pt-3 pb-2">
        <div className="relative flex w-full gap-2 lg:items-center lg:gap-4">
          <Avatar className="size-12 sm:size-10">
            <AvatarImage src={builder.icon} alt={builder.name ?? ''} />
            <AvatarFallback>{builder.name?.charAt(0).toUpperCase() ?? 'U'}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col sm:gap-1 lg:h-fit lg:flex-row lg:gap-4">
            {/* builder name */}
            <div className="flex items-center gap-1 sm:items-baseline md:items-start">
              <div className="text-foreground/30 text-base/6 font-semibold uppercase sm:text-sm/5.5 md:text-base/6">
                {builder.code}
              </div>
              <div className="text-foreground text-base/6 font-semibold md:text-lg md:leading-[120%] md:font-bold">
                {builder.name}
              </div>
            </div>
            {/* builder status */}
            <div className="flex flex-col gap-1 sm:flex-row">
              <BuildersStatusChip status={builder.status} />
              {ff.GOVERNANCE_LINK_ENABLED && (
                <Button variant="ghost" className="max-w-fit px-2 sm:h-6">
                  Since {formattedDate} <ExternalLinkIcon />
                </Button>
              )}
            </div>
          </div>
          <div className="absolute right-0 bottom-0 sm:top-0">
            {builder.links.length > 0 && <Links links={builder.links} />}
          </div>
        </div>
        <BuilderProfileHeaderDescription description={builder.description} />
      </div>
    </div>
  )
}

export { BuilderProfileHeader }
