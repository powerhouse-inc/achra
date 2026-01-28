import { useMemo } from 'react'
import { ExpenseReport_ExpenseReportStatus } from '@/modules/__generated__/graphql/switchboard-generated'
import { DrawerSelect } from '@/modules/shared/components/filter-drawer/filter-drawer'
import { MultipleSelector, type Option } from '@/modules/shared/components/form/multiselect'
import { cn } from '@/modules/shared/lib/utils'
import BudgetStatementsStatus from '../budget-staments-status/budget-statments-status'

interface BuilderStatusProps {
  status: ExpenseReport_ExpenseReportStatus[]
  setStatus: (scopes: ExpenseReport_ExpenseReportStatus[]) => Promise<URLSearchParams>
  className?: string
}

const statusOptions: Option[] = [
  {
    value: ExpenseReport_ExpenseReportStatus.Draft,
    label: <BudgetStatementsStatus status={ExpenseReport_ExpenseReportStatus.Draft} />,
    group: 'Status',
  },
  {
    value: ExpenseReport_ExpenseReportStatus.Final,
    label: <BudgetStatementsStatus status={ExpenseReport_ExpenseReportStatus.Final} />,
    group: 'Status',
  },
  {
    value: ExpenseReport_ExpenseReportStatus.Review,
    label: <BudgetStatementsStatus status={ExpenseReport_ExpenseReportStatus.Review} />,
    group: 'Status',
  },
]

function StatusSelectBudget({ status, setStatus, className }: Readonly<BuilderStatusProps>) {
  const selectedOptions = useMemo(
    () =>
      statusOptions.filter((option) =>
        status.includes(option.value as ExpenseReport_ExpenseReportStatus),
      ),
    [status],
  )

  const handleChange = (options: Option[]) => {
    const values = options.map((option) => option.value as ExpenseReport_ExpenseReportStatus)
    void setStatus(values)
  }

  return (
    <MultipleSelector
      value={selectedOptions}
      onChange={handleChange}
      options={statusOptions}
      enableSearch={false}
      groupBy="group"
      enableSelectAll={true}
      selectAllGroup="Status"
      placeholder="Status"
      className={cn('bg-background dark:bg-background')}
      commandProps={{
        className,
      }}
      customItemRenderer={(option): React.ReactNode => option.label}
    />
  )
}

function StatusSelectDrawer({ status, setStatus }: Readonly<BuilderStatusProps>) {
  const handleChange = (values: string[]) => {
    void setStatus(values as ExpenseReport_ExpenseReportStatus[])
  }

  return (
    <DrawerSelect
      value={status}
      onChange={handleChange}
      label="Status"
      options={statusOptions}
      multiselect={true}
      enableSelectAll={true}
      selectAllLabel="Select All"
    />
  )
}

export { StatusSelectBudget, StatusSelectDrawer }
