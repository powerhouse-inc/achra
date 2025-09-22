import { InternalLinkButton } from './internal-link-buttom'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta = {
  title: 'Shared/Components/Buttons/Internal Link Button',
  component: InternalLinkButton,
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/networks',
      },
    },
  },
} satisfies Meta<typeof InternalLinkButton>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  name: 'InternalLinkButton',
  args: {
    href: '/',
    children: 'Internal Link Button',
  },
}
