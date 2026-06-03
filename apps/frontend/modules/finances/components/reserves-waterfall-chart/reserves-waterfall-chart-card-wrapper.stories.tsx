import { withNuqsAdapter, withReactQueryProvider } from '@/modules/shared/lib/decorators'
import { ReservesWaterfallChartCardWrapper } from './reserves-waterfall-chart-card-wrapper'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Finances/Components/ReservesWaterfallChart/ReservesWaterfallChartCardWrapper',
  component: ReservesWaterfallChartCardWrapper,
  decorators: [withReactQueryProvider, withNuqsAdapter],
  parameters: {
    layout: 'padded',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/network/atlas/finances',
        query: { year: '2025' },
      },
    },
  },
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
