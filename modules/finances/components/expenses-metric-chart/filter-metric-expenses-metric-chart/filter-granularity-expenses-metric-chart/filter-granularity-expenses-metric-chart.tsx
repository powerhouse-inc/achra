import { GRANULARITY_OPTIONS } from '@/modules/finances/types'
import { DrawerSelect } from '@/modules/shared/components/filter-drawer/filter-drawer'
import type { Option } from '@/modules/shared/components/form/multiselect'

interface GranularitySelectProps {
  granularity: GRANULARITY_OPTIONS | null
  setGranularity: (granularity: GRANULARITY_OPTIONS) => Promise<URLSearchParams>
  className?: string
}

const granularityOptions: Option[] = [
  {
    value: GRANULARITY_OPTIONS.Monthly,
    label: GRANULARITY_OPTIONS.Monthly,
    group: 'Granularity',
  },
  {
    value: GRANULARITY_OPTIONS.Quarterly,
    label: GRANULARITY_OPTIONS.Quarterly,
    group: 'Granularity',
  },
  {
    value: GRANULARITY_OPTIONS.Annually,
    label: GRANULARITY_OPTIONS.Annually,
    group: 'Granularity',
  },
]

function ExpensesMetricGranularitySelectDrawer({
  granularity,
  setGranularity,
}: Readonly<GranularitySelectProps>) {
  const handleChange = (value: string) => {
    void setGranularity(value as GRANULARITY_OPTIONS)
  }

  return (
    <DrawerSelect
      value={granularity ?? undefined}
      onChange={handleChange}
      label="Granularity"
      options={granularityOptions}
    />
  )
}

export { ExpensesMetricGranularitySelectDrawer }
