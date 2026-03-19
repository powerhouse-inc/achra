import { withNextjsExtras } from '@/modules/shared/lib/decorators'
import { JoinedUsersBadge } from './joined-users-badge'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Whitelist/Components/JoinedUsersBadge',
  component: JoinedUsersBadge,
  decorators: [withNextjsExtras],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof JoinedUsersBadge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const CustomCount: Story = {
  args: {
    count: 250,
  },
}
