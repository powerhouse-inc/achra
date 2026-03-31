import { UTCDate } from '@date-fns/utc'
import { format } from 'date-fns'
import type { InnerTableColumn, InnerTableRow } from '@/modules/expense-reports/types'
import { AdvancedInnerTable } from '../../advanced-inner-table/advanced-inner-table'
import { EmptyTablePlaceholder } from '../../advanced-inner-table/empty-table-placeholder'

interface TotalWalletSectionProps {
  currentMonth: Date
  mainTableColumns: InnerTableColumn[]
  mainTableItems: InnerTableRow[]
  builderLabel: string
}

function TotalWalletSection({
  currentMonth,
  mainTableColumns,
  mainTableItems,
  builderLabel,
}: TotalWalletSectionProps) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg/[120%] font-bold">
        Actuals - {format(new UTCDate(currentMonth), 'MMM yyyy')} Totals
      </h2>

      <AdvancedInnerTable
        columns={mainTableColumns}
        cardSpacingSize="small"
        items={mainTableItems}
        cardsTotalPosition="top"
        longCode={builderLabel}
        tablePlaceholder={<EmptyTablePlaceholder actorName={builderLabel} />}
      />
    </div>
  )
}

export { TotalWalletSection }
