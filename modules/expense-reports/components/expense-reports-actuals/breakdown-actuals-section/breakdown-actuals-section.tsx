import { format } from 'date-fns'
import { toKebabCase } from '@/modules/expense-reports/lib/strings'
import { Tabs, TabsList, TabsTrigger } from '@/modules/shared/components/ui/tabs'
import { AdvancedInnerTable } from '../../advanced-inner-table/advanced-inner-table'
import { BREAKDOWN_COLUMNS } from './breakdown-columns'
import type { InnerTableRow } from '../../advanced-inner-table/types'

interface BreakdownActualsSectionProps {
  currentMonth: Date
  mainTableItems: InnerTableRow[]
  breakdownTabs: string[]
  breakdownItemsForActiveTab: InnerTableRow[]
  actualAccountTab: string | null
}

function BreakdownActualsSection({
  currentMonth,
  mainTableItems,
  breakdownTabs,
  breakdownItemsForActiveTab,
  actualAccountTab,
}: BreakdownActualsSectionProps) {
  const headerIds = breakdownTabs.map((header: string) => toKebabCase(header))

  return (
    <div className="flex flex-col gap-4">
      {mainTableItems.length > 0 && (
        <h2 className="text-lg/[120%] font-bold">
          Actuals - {format(currentMonth, 'MMM yyyy')} Breakdown
        </h2>
      )}

      {mainTableItems.length > 0 && (
        <div className="flex flex-col gap-6">
          <Tabs value={actualAccountTab ?? headerIds[0]} className="w-[400px]">
            <TabsList aria-label="Breakdown categories">
              {breakdownTabs.map((header, index) => (
                <TabsTrigger key={headerIds[index]} value={headerIds[index]}>
                  {header}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <div>
            <AdvancedInnerTable
              columns={BREAKDOWN_COLUMNS}
              items={breakdownItemsForActiveTab}
              longCode="longCode"
              cardSpacingSize="small"
              tablePlaceholder={<div>placeholder here...</div>}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export { BreakdownActualsSection }
