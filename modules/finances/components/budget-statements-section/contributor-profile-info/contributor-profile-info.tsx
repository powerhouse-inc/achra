import type {
  ExpenseReport_ExpenseReportStatus,
  Maybe,
} from '@/modules/__generated__/graphql/switchboard-generated'
import { cn } from '@/modules/shared/lib/utils'
import { AvatarWithIcon } from '../avatar-icon'
import { BudgetStatementsStatus } from '../budget-statements-status/budget-statements-status'

interface ContributorProfileInfoProps {
  name: string
  code?: Maybe<string>
  isCoreUnit: boolean
  icon?: boolean
  logoUrl?: Maybe<string>
  status?: Maybe<ExpenseReport_ExpenseReportStatus>
  className?: string
}

function ContributorProfileInfo({
  name,
  code,
  isCoreUnit,
  icon = true,
  logoUrl,
  status,
  className,
}: ContributorProfileInfoProps) {
  const hasLogo = logoUrl != null && logoUrl.trim() !== ''
  const fallbackText = name.charAt(0).toUpperCase() || '?'

  return (
    <div
      className={cn('flex min-w-0 items-center gap-2 md:flex-nowrap md:items-center', className)}
    >
      <AvatarWithIcon
        image={hasLogo ? logoUrl : undefined}
        fallbackText={fallbackText}
        icon={icon}
        isCoreUnit={isCoreUnit}
      />
      <div className="flex min-w-0 flex-col gap-1">
        <div className="flex-start md:flex-center flex min-w-0 gap-2 md:w-50">
          <div className="text-foreground/30 shrink-0 text-sm/5.5 font-semibold">{code}</div>
          <div className="truncate text-sm/5.5 font-semibold">{name}</div>
        </div>
        <div className="flex md:hidden">
          <BudgetStatementsStatus status={status as ExpenseReport_ExpenseReportStatus} />
        </div>
      </div>
    </div>
  )
}

export { ContributorProfileInfo }
