import { BudgetUtilizationCard } from './budget-utilization-card'

import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Finances/Components/SummarySection/BudgetUtilizationCard',
  component: BudgetUtilizationCard,
  parameters: { layout: 'padded' },
  argTypes: {
    paymentsOnChain: {
      control: 'number',
      description: 'Total payments on chain in USDS',
    },
    budgetCap: {
      control: 'number',
      description: 'Budget cap in USDS',
    },
  },
} satisfies Meta<typeof BudgetUtilizationCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    paymentsOnChain: 500000,
    budgetCap: 1000000,
  },
}
