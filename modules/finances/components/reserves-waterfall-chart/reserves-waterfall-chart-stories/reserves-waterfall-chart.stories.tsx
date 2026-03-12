import { ATLAS_BUDGETS, BUDGETS } from '@/modules/finances/mocks'

import { ReservesWaterfallChart } from '../reserves-waterfall-chart'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta = {
  title: 'Modules/Finances/ReservesWaterfallChart/ReservesWaterfallChart',
  component: ReservesWaterfallChart,
  parameters: { layout: 'padded' },
  render: (args) => (
    <div className="w-full max-w-[1200px]">
      <ReservesWaterfallChart {...args} />
    </div>
  ),
} satisfies Meta<typeof ReservesWaterfallChart>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    codePath: 'atlas/immutable',
    budgets: BUDGETS,
    allBudgets: ATLAS_BUDGETS,
    year: '2025',
  },
}
