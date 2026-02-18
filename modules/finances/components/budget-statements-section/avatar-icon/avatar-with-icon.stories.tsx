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

const SAMPLE_IMAGE_URL =
  'https://makerdao-ses.github.io/ecosystem-dashboard/ecosystem-actors/POWERHOUSE/POWERHOUSE_logo.png'

export const Default: Story = {
  render: (args) => <AvatarWithIcon {...args} />,
  args: {
    image: SAMPLE_IMAGE_URL,
    fallbackText: 'P',
    iconUrl: SAMPLE_IMAGE_URL,
  },
}

export const CoreUnit: Story = {
  render: (args) => <AvatarWithIcon {...args} isCoreUnit />,
  args: {
    image: SAMPLE_IMAGE_URL,
    fallbackText: 'P',
    iconUrl: SAMPLE_IMAGE_URL,
  },
}

export const WithoutOverlay: Story = {
  render: (args) => <AvatarWithIcon {...args} />,
  args: {
    image: SAMPLE_IMAGE_URL,
    fallbackText: 'P',
    iconUrl: undefined,
  },
}

export const FallbackOnly: Story = {
  render: (args) => <AvatarWithIcon {...args} />,
  args: {
    image: undefined,
    fallbackText: 'S',
    iconUrl: undefined,
  },
}
