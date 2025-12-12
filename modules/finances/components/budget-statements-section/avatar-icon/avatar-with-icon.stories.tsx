import { AvatarWithIcon } from './avatar-with-icon'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta = {
  title: 'Modules/Finances/AvatarWithIcon',
  component: AvatarWithIcon,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof AvatarWithIcon>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => <AvatarWithIcon {...args} />,
  args: {
    image:
      'https://makerdao-ses.github.io/ecosystem-dashboard/ecosystem-actors/POWERHOUSE/POWERHOUSE_logo.png',
    icon: true,
  },
}

export const CoreUnit: Story = {
  render: (args) => <AvatarWithIcon {...args} isCoreUnit />,
  args: {
    image:
      'https://makerdao-ses.github.io/ecosystem-dashboard/ecosystem-actors/POWERHOUSE/POWERHOUSE_logo.png',
    icon: true,
  },
}
