import {
  withNextjsExtras,
  withNuqsAdapter,
  withPortalFontStyles,
} from '@/modules/shared/lib/decorators'
import { GRANULARITY_OPTIONS, METRIC_OPTIONS } from '@/modules/finances/types'
import { BreakdownTableFilters } from './breakdown-table-filters'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const mockFilters = {
  metrics: [METRIC_OPTIONS.Actuals],
  granularity: GRANULARITY_OPTIONS.Monthly,
  setMetrics: () => {},
  setGranularity: () => {},
  onReset: () => {},
  isResetDisabled: true,
}

const meta = {
  title: 'Modules/Finances/Components/BreakdownTableFilters',
  component: BreakdownTableFilters,
  decorators: [withNextjsExtras, withNuqsAdapter, withPortalFontStyles],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof BreakdownTableFilters>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    filters: mockFilters,
  },
}

export const MultipleMetrics: Story = {
  args: {
    filters: {
      ...mockFilters,
      metrics: [METRIC_OPTIONS.Actuals, METRIC_OPTIONS.Budget, METRIC_OPTIONS.Forecast],
      isResetDisabled: false,
    },
  },
}

export const QuarterlyGranularity: Story = {
  args: {
    filters: {
      ...mockFilters,
      granularity: GRANULARITY_OPTIONS.Quarterly,
      isResetDisabled: false,
    },
  },
}
