import { mockBuilderProfile } from '@/modules/builder-profile/mocks'
import { withNextjsExtras, withPortalFontStyles } from '@/modules/shared/lib/decorators'
import { BuilderProfileHeader } from './builder-profile-header'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Builder Profile/Components/BuilderProfileHeader',
  component: BuilderProfileHeader,
  decorators: [withPortalFontStyles, withNextjsExtras],
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/network/powerhouse/builders/powerhouse',
      },
    },
  },
} satisfies Meta<typeof BuilderProfileHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    builder: mockBuilderProfile,
    isOperatorProfile: false,
  },
}

export const OperatorProfile: Story = {
  args: {
    builder: mockBuilderProfile,
    isOperatorProfile: true,
  },
}
