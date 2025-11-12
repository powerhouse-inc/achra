import { ConnectLink } from './connect-link'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta = {
  title: 'Shared/Components/Buttons/Connect link',
  component: ConnectLink,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/networks',
      },
    },
  },
  argTypes: {
    action: {
      control: 'select',
      options: ['open', 'edit'],
      description: 'The action type for the Connect link',
    },
    driveName: {
      control: 'text',
      description: 'The name of the drive to display',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the link is disabled',
    },
    href: {
      control: 'text',
      description: 'The URL to navigate to',
    },
  },
} satisfies Meta<typeof ConnectLink>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  name: 'Open Action (Default)',
  args: {
    href: 'https://connect.example.com/drive/123',
    driveName: 'Network Drive',
    action: 'open',
    disabled: false,
  },
}

export const EditAction: Story = {
  args: {
    href: 'https://connect.example.com/drive/123/edit',
    driveName: 'Network Drive',
    action: 'edit',
    disabled: false,
  },
}

export const Disabled: Story = {
  name: 'Disabled State',
  args: {
    href: 'https://connect.example.com/drive/123',
    driveName: 'Network Drive',
    action: 'open',
    disabled: true,
  },
}

export const LongDriveName: Story = {
  args: {
    href: 'https://connect.example.com/drive/456',
    driveName: 'Very Long Network Drive Name That Might Wrap',
    action: 'open',
    disabled: false,
  },
  render: (args) => (
    <div className="max-w-64">
      <ConnectLink {...args} />
    </div>
  ),
}
