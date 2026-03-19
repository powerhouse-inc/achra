import { withNextjsExtras } from '@/modules/shared/lib/decorators'
import { WhitelistOverlay } from './whitelist-overlay'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Whitelist/Components/WhitelistOverlay',
  component: WhitelistOverlay,
  decorators: [withNextjsExtras],
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/',
      },
    },
  },
} satisfies Meta<typeof WhitelistOverlay>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
