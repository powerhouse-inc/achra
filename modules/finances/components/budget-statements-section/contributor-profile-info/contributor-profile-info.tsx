import { AvatarWithIcon } from '../avatar-icon'

interface ContributorProfileInfoProps {
  name: string
  code: string
  isCoreUnit: boolean
  icon: boolean
}

export function ContributorProfileInfo({
  name,
  code,
  isCoreUnit,
  icon,
}: ContributorProfileInfoProps) {
  return (
    <div className="flex items-center gap-2">
      <AvatarWithIcon
        image="https://makerdao-ses.github.io/ecosystem-dashboard/ecosystem-actors/POWERHOUSE/POWERHOUSE_logo.png"
        icon={icon}
        isCoreUnit={isCoreUnit}
      />
      <div className="flex gap-1">
        <div className="text-foreground/30 text-sm/5.5 font-semibold">{code}</div>
        <div className="w-50 truncate text-sm/5.5 font-semibold">{name}</div>
      </div>
    </div>
  )
}
