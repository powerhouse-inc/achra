import { withNuqsAdapter } from '@/modules/shared/lib/decorators'
import { ExpensesMetricChartCardWrapper } from '../expenses-metric-chart-card-wrapper'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta = {
  title: 'Modules/Finances/ExpensesMetricChart/ExpensesMetricChart',
  component: ExpensesMetricChartCardWrapper,
  decorators: [withNuqsAdapter],
} satisfies Meta<typeof ExpensesMetricChartCardWrapper>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    params: Promise.resolve({
      slug: 'atlas',
    }),
    searchParams: Promise.resolve({ year: '2025' }),
  },
}
