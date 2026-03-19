import { METRIC_OPTIONS } from '@/modules/finances/types'
import {
  withNextjsExtras,
  withNuqsAdapter,
  withPortalFontStyles,
} from '@/modules/shared/lib/decorators'
import { BreakdownMetricSelectDrawer } from './filter-metric-breakdown-chart'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Finances/Components/FilterMetricBreakdownChart',
  component: BreakdownMetricSelectDrawer,
  decorators: [withNextjsExtras, withNuqsAdapter, withPortalFontStyles],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof BreakdownMetricSelectDrawer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    metric: METRIC_OPTIONS.Actuals,
    setMetric: async () => new URLSearchParams(),
  },
}
