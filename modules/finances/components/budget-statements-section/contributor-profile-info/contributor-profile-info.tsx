import type {
  ExpenseReport_ExpenseReportStatus,
  Maybe,
} from '@/modules/__generated__/graphql/switchboard-generated'
import { cn } from '@/modules/shared/lib/utils'
import { AvatarWithIcon } from '../avatar-icon'
import BudgetStatementsStatus from '../budget-staments-status/budget-statments-status'

interface ContributorProfileInfoProps {
  name: string
  code?: Maybe<string>
  isCoreUnit: boolean
  icon: boolean
  status?: Maybe<ExpenseReport_ExpenseReportStatus>
  className?: string
  logo?: string
}

export function ContributorProfileInfo({
  name,
  code,
  isCoreUnit,
  icon,
  status,
  className,
  logo,
}: ContributorProfileInfoProps) {
  return (
    <div
      className={cn('flex flex-wrap items-center gap-2 md:flex-nowrap md:items-center', className)}
    >
      <AvatarWithIcon
        image={
          logo ??
          'https://makerdao-ses.github.io/ecosystem-dashboard/ecosystem-actors/POWERHOUSE/POWERHOUSE_logo.png'
        }
        icon={icon}
        isCoreUnit={isCoreUnit}
      />
      <div className="flex flex-col gap-1">
        <div className="flex-start md:flex-center md:50 flex gap-2 md:w-50">
          <div className="text-foreground/30 text-sm/5.5 font-semibold">{code}</div>
          <div className="truncate text-sm/5.5 font-semibold">{name}</div>
        </div>
        <div className="flex md:hidden">
          <BudgetStatementsStatus status={status as ExpenseReport_ExpenseReportStatus} />
        </div>
      </div>
    </div>
  )
}
