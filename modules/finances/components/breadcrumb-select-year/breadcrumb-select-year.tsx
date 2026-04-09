import { Breadcrumb, type BreadcrumbItemNavigation } from '@/modules/shared/components/breadcrumb'
import ff from '@/modules/shared/lib/feature-flags'
import { YearSelect } from '../year-select'
interface BreadcrumbSelectYearProps {
  items: BreadcrumbItemNavigation[]
}

export function BreadcrumbSelectYear({ items }: Readonly<BreadcrumbSelectYearProps>) {
  return (
    <div className="flex w-full items-center gap-4">
      <div className="min-w-0 flex-1">
        <Breadcrumb items={items} />
      </div>
      {ff.finances.YEAR_SELECTOR_ENABLED && (
        <div className="shrink-0">
          <YearSelect />
        </div>
      )}
    </div>
  )
}
