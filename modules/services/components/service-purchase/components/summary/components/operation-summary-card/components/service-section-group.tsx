import { LineItem } from './line-item'
import { PriceIncludesRow } from './price-includes-row'
import { SectionHeader } from './section-header'
import type { Plan } from '../../../../configure-services-purchase/components/types'
import type { SummaryGroup } from '../../../utils'

interface ServiceSectionGroupProps {
  group: SummaryGroup
  selectedPlan: Plan
  setupFee: number
}

export function ServiceSectionGroup({
  group,
  selectedPlan,
  setupFee,
}: Readonly<ServiceSectionGroupProps>) {
  return (
    <div className="flex flex-col gap-3">
      <SectionHeader title={group.title} selectedValue={group.selectedValue} />
      <PriceIncludesRow price={group.priceLabel} />
      {group.rows.map((row) => (
        <div key={row.id} className="flex flex-col last:mb-3">
          <LineItem row={row} selectedPlan={selectedPlan} setupFee={setupFee} />
        </div>
      ))}
    </div>
  )
}
