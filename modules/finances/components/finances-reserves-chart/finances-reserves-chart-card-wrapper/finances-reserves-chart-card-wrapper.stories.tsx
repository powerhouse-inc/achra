import { withNuqsAdapter } from '@/modules/shared/lib/decorators'
import { seriesGranularityMonthlyFirstLevelFinancesReserves } from '../../../mocks/finances-reserves-chart'
import { type Analytic, GRANULARITY_OPTIONS } from '../../../types'
import { FinancesReservesChartCard } from '../finances-reserves-chart-card'
import { FinancesReservesChartContent } from '../finances-reserves-chart-content'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta = {
  title: 'Modules/Finances/FinancesReservesChart/FinancesReservesChart',
  component: FinancesReservesChartContent,
  decorators: [withNuqsAdapter],
  render: (args) => (
    <FinancesReservesChartCard>
      <FinancesReservesChartContent {...args} />
    </FinancesReservesChartCard>
  ),
} satisfies Meta<typeof FinancesReservesChartContent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    year: '2025',
    granularity: GRANULARITY_OPTIONS.Monthly,
    analytics: {
      series: seriesGranularityMonthlyFirstLevelFinancesReserves,
    } as Analytic,
  },
}
