import type { BuilderStatus } from '@/modules/__generated__/graphql/switchboard-generated'
import { BuildersStatusChip } from '@/modules/shared/components/chips/builders-status-chip'
import { cn } from '@/modules/shared/lib/utils'
import { AvatarWithIcon } from '../avatar-icon'

interface ContributorProfileInfoProps {
  name: string
  code: string
  isCoreUnit: boolean
  icon: boolean
  status: BuilderStatus
  className?: string
}

export function ContributorProfileInfo({
  name,
  code,
  isCoreUnit,
  icon,
  status,
  className,
}: ContributorProfileInfoProps) {
  return (
    <div
      className={cn('flex flex-wrap items-center gap-2 md:flex-nowrap md:items-center', className)}
    >
      <AvatarWithIcon
        image="https://makerdao-ses.github.io/ecosystem-dashboard/ecosystem-actors/POWERHOUSE/POWERHOUSE_logo.png"
        icon={icon}
        isCoreUnit={isCoreUnit}
      />
      <div className="flex flex-col gap-1">
        <div className="flex-start md:flex-center md:50 flex gap-2 lg:w-50">
          <div className="text-foreground/30 text-sm/5.5 font-semibold">{code}</div>
          <div className="truncate text-sm/5.5 font-semibold">{name}</div>
        </div>
        <div className="flex md:hidden">
          <BuildersStatusChip status={status} />
        </div>
      </div>
    </div>
  )
}
