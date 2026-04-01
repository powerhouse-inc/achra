import { SAMPLE_IMAGE_URL } from '@/modules/finances/mocks'
import { AvatarWithIcon } from './avatar-with-icon'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Finances/Components/BudgetStatementsSection/AvatarWithIcon',
  component: AvatarWithIcon,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    image: {
      control: 'text',
      description: 'URL of the avatar image',
    },
    fallbackText: {
      control: 'text',
      description: 'Fallback text when image is not available',
    },
    icon: {
      control: 'boolean',
      description: 'Whether to show the core unit icon overlay',
    },
    isCoreUnit: {
      control: 'boolean',
      description: 'Whether this is a core unit (affects icon overlay)',
    },
  },
} satisfies Meta<typeof AvatarWithIcon>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => <AvatarWithIcon {...args} />,
  args: {
    image: SAMPLE_IMAGE_URL,
    fallbackText: 'P',
    icon: true,
  },
}

export const CoreUnit: Story = {
  render: (args) => <AvatarWithIcon {...args} isCoreUnit />,
  args: {
    image: SAMPLE_IMAGE_URL,
    fallbackText: 'P',
    icon: true,
  },
}

export const WithoutOverlay: Story = {
  render: (args) => <AvatarWithIcon {...args} />,
  args: {
    image: SAMPLE_IMAGE_URL,
    fallbackText: 'P',
    icon: false,
  },
}

export const FallbackOnly: Story = {
  render: (args) => <AvatarWithIcon {...args} />,
  args: {
    image: undefined,
    fallbackText: 'S',
    icon: false,
  },
}
