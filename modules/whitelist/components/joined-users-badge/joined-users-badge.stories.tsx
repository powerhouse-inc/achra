import { JoinedUsersBadge } from './joined-users-badge'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Whitelist/Components/JoinedUsersBadge',
  component: JoinedUsersBadge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    count: {
      control: 'number',
      description: 'Number of people shown in the badge text',
    },
  },
} satisfies Meta<typeof JoinedUsersBadge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
