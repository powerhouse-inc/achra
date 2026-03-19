import { ScopeOfWork_BudgetType } from '@/modules/__generated__/graphql/switchboard-generated'
import { BudgetMetricCard } from './budget-metric-card'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Project/Components/BudgetMetricCard',
  component: BudgetMetricCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'number' },
    unit: { control: 'text' },
    budgetType: { control: 'select', options: Object.values(ScopeOfWork_BudgetType) },
  },
} satisfies Meta<typeof BudgetMetricCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: 50000,
    unit: 'USD',
    budgetType: ScopeOfWork_BudgetType.Capex,
  },
}

export const WithOpex: Story = {
  args: {
    value: 120000,
    unit: 'DAI',
    budgetType: ScopeOfWork_BudgetType.Opex,
  },
}

export const NoValue: Story = {
  args: {
    value: undefined,
    unit: undefined,
    budgetType: undefined,
  },
}
