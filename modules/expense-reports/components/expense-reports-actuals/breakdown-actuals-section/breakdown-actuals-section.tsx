'use client'

import { format } from 'date-fns'
import { useQueryState } from 'nuqs'
import { useMemo } from 'react'
import { actualAccountTabSearchParamParser } from '@/modules/expense-reports/lib/search-params-client'
import { toKebabCase } from '@/modules/expense-reports/lib/strings'
import type { InnerTableRow } from '@/modules/expense-reports/types'
import { Tabs, TabsList, TabsTrigger } from '@/modules/shared/components/ui/tabs'
import { AdvancedInnerTable } from '../../advanced-inner-table/advanced-inner-table'
import { EmptyTablePlaceholder } from '../../advanced-inner-table/empty-table-placeholder'
import { BREAKDOWN_COLUMNS } from './breakdown-columns'

const ACTUALS_ACCOUNT_PARAM = 'actuals-account'

interface BreakdownActualsSectionProps {
  currentMonth: Date
  hasMainTableItems: boolean
  breakdownTabs: string[]
  breakdownItemsByWallet: InnerTableRow[][]
  builderLabel: string
}

function BreakdownActualsSection({
  currentMonth,
  hasMainTableItems,
  breakdownTabs,
  breakdownItemsByWallet,
  builderLabel,
}: BreakdownActualsSectionProps) {
  const headerIds = useMemo(
    () => breakdownTabs.map((header, index) => toKebabCase(header) || `wallet-${index}`),
    [breakdownTabs],
  )
  const defaultTabId = headerIds[0] ?? ''

  const [actualsAccount, setActualsAccount] = useQueryState(
    ACTUALS_ACCOUNT_PARAM,
    actualAccountTabSearchParamParser,
  )

  const activeTab =
    actualsAccount && headerIds.includes(actualsAccount) ? actualsAccount : defaultTabId

  const handleTabChange = (value: string) => {
    void setActualsAccount(value === defaultTabId ? null : value)
  }

  const activeIndex = Math.max(0, headerIds.indexOf(activeTab))
  const items = breakdownItemsByWallet[activeIndex] ?? []

  return (
    <div className="flex flex-col gap-4">
      {hasMainTableItems && (
        <h2 className="text-lg/[120%] font-bold">
          Actuals - {format(currentMonth, 'MMM yyyy')} Breakdown
        </h2>
      )}

      {hasMainTableItems && (
        <div className="flex flex-col gap-6">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-[400px]">
            <TabsList aria-label="Breakdown categories">
              {breakdownTabs.map((header, index) => (
                <TabsTrigger key={headerIds[index]} value={headerIds[index]}>
                  {header || `Wallet ${index + 1}`}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <div>
            <AdvancedInnerTable
              columns={BREAKDOWN_COLUMNS}
              items={items}
              longCode={builderLabel}
              cardSpacingSize="small"
              tablePlaceholder={<EmptyTablePlaceholder actorName={builderLabel} />}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export { BreakdownActualsSection }
