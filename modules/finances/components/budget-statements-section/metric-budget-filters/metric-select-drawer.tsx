import { METRIC_OPTIONS } from '@/modules/finances/types'
import { DrawerSelect } from '@/modules/shared/components/filter-drawer/filter-drawer'
import type { Option } from '@/modules/shared/components/form/multiselect'

interface MetricSelectProps {
  metric: Exclude<METRIC_OPTIONS, 'Budget'> | null
  setMetric: (metric: Exclude<METRIC_OPTIONS, 'Budget'>) => void
  className?: string
}

const metricOptions: Option[] = [
  {
    value: METRIC_OPTIONS.Actuals,
    label: METRIC_OPTIONS.Actuals,
    group: 'Metrics',
  },
  {
    value: METRIC_OPTIONS.Forecast,
    label: METRIC_OPTIONS.Forecast,
    group: 'Metrics',
  },
  {
    value: METRIC_OPTIONS.NetExpensesOnChain,
    label: METRIC_OPTIONS.NetExpensesOnChain,
    group: 'Metrics',
  },
  {
    value: METRIC_OPTIONS.NetProtocolOutflow,
    label: METRIC_OPTIONS.NetProtocolOutflow,
    group: 'Metrics',
  },
]

function MetricSelectDrawer({ metric, setMetric }: Readonly<MetricSelectProps>) {
  const handleChange = (value: string) => {
    setMetric(value as Exclude<METRIC_OPTIONS, 'Budget'>)
  }

  return (
    <DrawerSelect
      value={metric ?? undefined}
      onChange={handleChange}
      label="Metrics"
      options={metricOptions}
    />
  )
}

export { MetricSelectDrawer }
