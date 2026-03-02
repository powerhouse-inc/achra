import { METRIC_OPTIONS } from '@/modules/finances/types'
import { DrawerSelect } from '@/modules/shared/components/filter-drawer/filter-drawer'
import type { Option } from '@/modules/shared/components/form/multiselect'

interface MetricSelectProps {
  metric: METRIC_OPTIONS | null
  setMetric: (metric: METRIC_OPTIONS) => Promise<URLSearchParams>
  className?: string
}

const metricOptions: Option[] = [
  {
    value: METRIC_OPTIONS.Actuals,
    label: METRIC_OPTIONS.Actuals,
    group: 'Metrics',
  },
  {
    value: METRIC_OPTIONS.Budget,
    label: METRIC_OPTIONS.Budget,
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

function ExpensesMetricSelectDrawer({ metric, setMetric }: Readonly<MetricSelectProps>) {
  const handleChange = (value: string) => {
    void setMetric(value as METRIC_OPTIONS)
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

export { ExpensesMetricSelectDrawer }
