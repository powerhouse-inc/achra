'use client'

import { Landmark } from 'lucide-react'
import { useMemo } from 'react'
import { RsGroupCostType } from '@/modules/__generated__/graphql/switchboard-generated'
import { sortOptionGroups } from '@/modules/service-purchase/lib/utils'
import {
  useAllOptionGroups,
  usePurchaseTotals,
  useServicePurchaseState,
} from '@/modules/service-purchase/providers/service-purchase-store-provider'
import { Card, CardContent, CardHeader } from '@/modules/shared/components/ui/card'
import { SelectedFacets } from './selected-facets'
import { Summary } from './summary-section'

function SummaryCard() {
  const { facets } = useServicePurchaseState()
  const totals = usePurchaseTotals()
  const optionGroups = useAllOptionGroups()

  const { recurringGroups, setupGroups } = useMemo(() => {
    const selected = optionGroups.filter((g) => g.isSelected)
    return {
      recurringGroups: sortOptionGroups(
        selected.filter((g) => g.costType === RsGroupCostType.Recurring),
      ),
      setupGroups: sortOptionGroups(selected.filter((g) => g.costType === RsGroupCostType.Setup)),
    }
  }, [optionGroups])

  return (
    <Card className="mx-auto w-full max-w-218.5 overflow-hidden border-none p-0!">
      <CardHeader className="flex flex-row items-start justify-between gap-4 px-3 pt-3 lg:px-6 lg:pt-6">
        <div className="flex items-start gap-2">
          <div className="bg-primary flex size-12 shrink-0 items-center justify-center rounded-2xl">
            <Landmark className="text-primary-foreground size-6" strokeWidth={1.5} />
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-foreground text-sm/5.5 leading-tight font-semibold lg:text-lg lg:leading-[120%]">
              Operational Hub for Open Source Builders
            </h2>
            <span className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
              Resource Template
            </span>
          </div>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-0.5">
          <span className="text-primary text-base/6 font-semibold lg:leading-7">
            ${totals.recurringTotal}/mo
          </span>
          <span className="text-foreground/50 text-xs/4.5 font-medium">
            + ${totals.setupTotal} Setup
          </span>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-6 p-0! pb-3! lg:pb-6!">
        {facets.length > 0 && <SelectedFacets />}

        <div className="flex flex-col gap-4 px-3 lg:px-6">
          {recurringGroups.length > 0 && (
            <Summary.Provider sectionLabel="Recurring" totalSuffix="/mo">
              <Summary.Card>
                <Summary.Header />
                <Summary.Content>
                  {recurringGroups.map((group) => (
                    <Summary.Group key={group.id} group={group} />
                  ))}
                </Summary.Content>
                <Summary.Total totalAmount={totals.recurringTotal} />
              </Summary.Card>
            </Summary.Provider>
          )}

          {setupGroups.length > 0 && (
            <Summary.Provider sectionLabel="ONE-TIME FEE" totalSuffix="">
              <Summary.Card>
                <Summary.Header />
                <Summary.Content>
                  {setupGroups.map((group) => (
                    <Summary.Group key={group.id} group={group} />
                  ))}
                </Summary.Content>
              </Summary.Card>
            </Summary.Provider>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export { SummaryCard }
