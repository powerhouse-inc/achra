import { Tabs, TabsList, TabsTrigger } from '@/modules/shared/components/ui/tabs'
import { AdvancedInnerTable } from '../../advanced-inner-table/advanced-inner-table'
import type { InnerTableColumn, InnerTableRow } from '../../advanced-inner-table/types'
import type { DateTime } from 'luxon'

interface BreakdownActualsSectionProps {
  currentMonth: DateTime
  mainTableItems: InnerTableRow[]
  breakdownTitleRef: React.RefObject<HTMLDivElement>
  breakdownTabs: string[]
  headerIds: string[]
  breakdownColumnsForActiveTab: InnerTableColumn[]
  breakdownItemsForActiveTab: InnerTableRow[]
  actualAccountTab: string | null
  onActualAccountTabChange: (value: string | null) => void
}

function BreakdownActualsSection({
  currentMonth,
  mainTableItems,
  breakdownTitleRef,
  breakdownTabs,
  headerIds,
  breakdownColumnsForActiveTab,
  breakdownItemsForActiveTab,
  actualAccountTab,
  onActualAccountTabChange,
}: BreakdownActualsSectionProps) {
  return (
    <div className="flex flex-col gap-4">
      {mainTableItems.length > 0 && (
        <h2 className="text-lg/[120%] font-bold" ref={breakdownTitleRef}>
          {currentMonth.toFormat('MMM yyyy')} Breakdown
        </h2>
      )}

      {mainTableItems.length > 0 && (
        <div className="flex flex-col gap-6">
          <Tabs
            value={actualAccountTab ?? headerIds[0]}
            onValueChange={onActualAccountTabChange}
            className="w-[400px]"
          >
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
              columns={breakdownColumnsForActiveTab}
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
