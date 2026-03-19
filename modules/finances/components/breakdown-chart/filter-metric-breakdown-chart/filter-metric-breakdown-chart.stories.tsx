import { METRIC_OPTIONS } from '@/modules/finances/types'
import { withNuqsAdapter, withPortalFontStyles } from '@/modules/shared/lib/decorators'
import { BreakdownMetricSelectDrawer } from './filter-metric-breakdown-chart'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Finances/Components/FilterMetricBreakdownChart',
  component: BreakdownMetricSelectDrawer,
  decorators: [withNuqsAdapter, withPortalFontStyles],
  argTypes: {
    metric: {
      control: 'select',
      options: Object.values(METRIC_OPTIONS),
      description: 'Currently selected metric',
    },
    setMetric: {
      control: false,
      description: 'Callback to update the selected metric',
    },
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof BreakdownMetricSelectDrawer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    metric: METRIC_OPTIONS.Actuals,
    setMetric: async () => Promise.resolve(new URLSearchParams()),
  },
}
