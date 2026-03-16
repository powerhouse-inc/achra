import { FinancesYearProvider } from '@/modules/finances/providers/finances-year-provider'
import { withNuqsAdapter } from '@/modules/shared/lib/decorators'
import { ExpensesMetricChartCardWrapper } from '../expenses-metric-chart-card-wrapper'
import type { Meta, StoryObj } from '@storybook/nextjs'
import type { ComponentType } from 'react'

const withFinancesYearProvider = (Story: ComponentType) => (
  <FinancesYearProvider>
    <Story />
  </FinancesYearProvider>
)

const meta = {
  title: 'Modules/Finances/ExpensesMetricChart/ExpensesMetricChart',
  component: ExpensesMetricChartCardWrapper,
  decorators: [withNuqsAdapter, withFinancesYearProvider],
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
