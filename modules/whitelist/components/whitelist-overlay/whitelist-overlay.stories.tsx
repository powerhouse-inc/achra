import { withPortalFontStyles } from '@/modules/shared/lib/decorators'
import { whitelistHandlers } from '@/modules/whitelist/mocks/whitelist-handlers'
import { WhitelistOverlay } from './whitelist-overlay'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Whitelist/Components/WhitelistOverlay',
  component: WhitelistOverlay,
  decorators: [withPortalFontStyles],
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/',
      },
    },
    msw: {
      handlers: whitelistHandlers,
    },
  },
} satisfies Meta<typeof WhitelistOverlay>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
