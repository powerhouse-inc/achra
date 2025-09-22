import { ExternalLinkButton } from './external-link-button'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta = {
  title: 'Shared/Components/Buttons/External Link Button',
  component: ExternalLinkButton,
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/networks',
      },
    },
  },
} satisfies Meta<typeof ExternalLinkButton>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  name: 'ExternalLinkButton',
  args: {
    href: 'https://www.google.com',
    children: 'External Link Button',
  },
}
