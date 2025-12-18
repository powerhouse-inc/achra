import { mockBuilderTeams } from '@/modules/networks/mocks/builders-section'
import { BudgetStatementsItem } from './budget-stament-item/budget-staments-item'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta = {
  title: 'Modules/Finances/BudgetStatementsSection/BudgetStatementsItem',
  component: BudgetStatementsItem,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Displays a placeholder list for Builder Teams within the Builders section.',
      },
    },
  },
} satisfies Meta<typeof BudgetStatementsItem>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    builders: mockBuilderTeams,
  },
}
