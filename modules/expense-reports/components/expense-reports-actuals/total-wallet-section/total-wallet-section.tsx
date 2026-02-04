import { format } from 'date-fns'
import { AdvancedInnerTable } from '../../advanced-inner-table/advanced-inner-table'
import { EmptyTablePlaceholder } from '../../advanced-inner-table/empty-table-placeholder'
import type { InnerTableColumn, InnerTableRow } from '../../advanced-inner-table/types'

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
        Actuals - {format(currentMonth, 'MMM yyyy')} Totals
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
