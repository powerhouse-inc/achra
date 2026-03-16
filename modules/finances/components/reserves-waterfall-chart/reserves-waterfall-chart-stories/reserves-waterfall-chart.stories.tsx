import { withNuqsAdapter } from '@/modules/shared/lib/decorators'
import { ReservesWaterfallChartCardWrapper } from '../reserves-waterfall-chart-card-wrapper'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta = {
  title: 'Modules/Finances/ReservesWaterfallChart/ReservesWaterfallChart',
  component: ReservesWaterfallChartCardWrapper,
  decorators: [withNuqsAdapter],
} satisfies Meta<typeof ReservesWaterfallChartCardWrapper>

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
