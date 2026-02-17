import { Landmark } from 'lucide-react'
import type { RsServiceOffering } from '@/modules/__generated__/graphql/switchboard-generated'
import { Card, CardContent, CardHeader } from '@/modules/shared/components/ui/card'
import { buildSummaryGroups, calculateRecurringTotal, getSetupFee } from '../../utils'
import { ServiceSectionGroup } from './components/service-section-group'

interface OperationSummaryCardProps {
  pricingData: RsServiceOffering
  selectedPlan?: string
  selectedAddons?: string[]
}

export function OperationSummaryCard({
  pricingData,
  selectedPlan,
  selectedAddons = [],
}: Readonly<OperationSummaryCardProps>) {
  const currentTier = pricingData.tiers.find((tier) => tier.name === selectedPlan)

  if (!currentTier) {
    return null
  }

  const summaryGroups = buildSummaryGroups(pricingData, currentTier, selectedAddons)
  const recurringTotal = calculateRecurringTotal(currentTier)
  const setupFee = getSetupFee(pricingData)

  return (
    <Card className="mx-auto w-full max-w-218.5 overflow-hidden p-0!">
      <CardHeader className="flex flex-row items-start justify-between gap-4 px-3 pt-3 lg:px-6 lg:pt-6">
        <div className="flex items-start gap-2">
          <div className="bg-primary flex size-12 shrink-0 items-center justify-center rounded-2xl">
            <Landmark className="text-primary-foreground size-6" strokeWidth={1.5} />
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-foreground text-sm/5.5 leading-tight font-semibold lg:text-lg lg:leading-[120%]">
              {pricingData.title}
            </h2>
            <span className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
              Selected Resource
            </span>
          </div>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-0.5">
          <span className="text-primary text-base/6 font-semibold lg:leading-7">
            ${recurringTotal}/mo
          </span>
          {setupFee > 0 && (
            <span className="text-foreground/50 text-xs/4.5 font-medium">
              + ${setupFee.toLocaleString()} Setup
            </span>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-0! pb-3! lg:pb-6!">
        <div className="flex flex-col">
          {summaryGroups.map((group) => (
            <ServiceSectionGroup key={group.id} group={group} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
