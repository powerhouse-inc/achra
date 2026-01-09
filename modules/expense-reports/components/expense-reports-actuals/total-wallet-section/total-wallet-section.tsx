import { AdvancedInnerTable } from '../../advanced-inner-table/advanced-inner-table'
import type { InnerTableColumn, InnerTableRow } from '../../advanced-inner-table/types'
import type { DateTime } from 'luxon'

interface TotalWalletSectionProps {
  currentMonth: DateTime
  mainTableColumns: InnerTableColumn[]
  mainTableItems: InnerTableRow[]
}

function TotalWalletSection({
  currentMonth,
  mainTableColumns,
  mainTableItems,
}: TotalWalletSectionProps) {
  return (
    <div className="flex flex-col">
      <h2 className="text-lg/[120%] font-bold">
        Actuals - {currentMonth.toFormat('MMM yyyy')} Totals
      </h2>

      <AdvancedInnerTable
        columns={mainTableColumns}
        cardSpacingSize="small"
        items={mainTableItems}
        cardsTotalPosition="top"
        longCode="longCode"
        tablePlaceholder={
          // <BudgetStatementsPlaceholder
          //   longCode={longCode}
          //   shortCode={shortCode}
          //   resource={resource}
          // />
          <div>table placeholder here...</div>
        }
      />
    </div>
  )
}

export { TotalWalletSection }
