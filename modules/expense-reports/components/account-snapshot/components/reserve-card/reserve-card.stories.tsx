import { mockReserveAccount } from '@/modules/expense-reports/mocks'
import { withNextjsExtras, withPortalFontStyles } from '@/modules/shared/lib/decorators'
import { ReserveCard } from './reserve-card'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Expense Reports/Components/ReserveCard',
  component: ReserveCard,
  decorators: [withPortalFontStyles, withNextjsExtras],
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
