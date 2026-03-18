import { BudgetUtilizationCard } from './budget-utilization-card'

import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Finances/SummarySection/BudgetUtilizationCard',
  component: BudgetUtilizationCard,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof BudgetUtilizationCard>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    paymentsOnChain: 500000,
    budgetCap: 1000000,
  },
}
