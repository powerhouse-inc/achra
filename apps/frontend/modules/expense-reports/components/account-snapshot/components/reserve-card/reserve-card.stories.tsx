import { mockReserveAccount } from '@/modules/expense-reports/mocks'
import { withPortalFontStyles } from '@/modules/shared/lib/decorators'
import { ReserveCard } from './reserve-card'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/ExpenseReports/Components/AccountSnapshot/ReserveCard',
  component: ReserveCard,
  decorators: [withPortalFontStyles],
  argTypes: {
    account: {
      control: false,
      description: 'Reserve account or operational group data',
    },
    defaultExpanded: {
      control: 'boolean',
      description: 'Whether the accordion starts expanded (story-only)',
    },
  },
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof ReserveCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    account: mockReserveAccount,
    defaultExpanded: false,
  },
}

export const Expanded: Story = {
  args: {
    ...Default.args,
    defaultExpanded: true,
  },
}
