import { LineItem } from './line-item'
import { PriceIncludesRow } from './price-includes-row'
import { SectionHeader } from './section-header'
import type { SummaryGroup } from '../../../utils'

interface ServiceSectionGroupProps {
  group: SummaryGroup
}

export function ServiceSectionGroup({ group }: Readonly<ServiceSectionGroupProps>) {
  return (
    <div className="flex flex-col gap-3">
      <SectionHeader title={group.title} selectedValue={group.selectedValue} />
      <PriceIncludesRow price={group.priceLabel} />
      {group.rows.map((row) => (
        <div key={row.id} className="flex flex-col last:mb-3">
          <LineItem row={row} />
        </div>
      ))}
    </div>
  )
}
