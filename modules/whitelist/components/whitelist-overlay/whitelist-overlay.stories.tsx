import { withPortalFontStyles } from '@/modules/shared/lib/decorators'
import { cn } from '@/modules/shared/lib/utils'
import { whitelistHandlers } from '@/modules/whitelist/mocks/whitelist-handlers'
import { SuccessView } from '../success-view'
import { WhitelistForm } from '../whitelist-form'
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
        pathname: '/builders',
      },
    },
    msw: {
      handlers: whitelistHandlers,
    },
  },
} satisfies Meta<typeof WhitelistOverlay>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="fixed right-0 bottom-0 left-0 z-50 h-[calc(100vh-12rem)] sm:h-[calc(100vh-18rem)]">
      <div
        className={cn(
          'bg-background relative h-full',
          'before:to-background before:absolute before:-top-[118px] before:right-0 before:left-0 before:h-30 before:bg-gradient-to-b before:from-transparent before:content-[""]',
        )}
      >
        <div className="container flex h-full w-full flex-col items-center justify-center px-4">
          <WhitelistForm onSuccess={() => {}} />
        </div>
      </div>
    </div>
  ),
}

export const Success: Story = {
  render: () => (
    <div className="fixed right-0 bottom-0 left-0 z-50 h-[calc(100vh-12rem)] sm:h-[calc(100vh-18rem)]">
      <div
        className={cn(
          'bg-background relative h-full',
          'before:to-background before:absolute before:-top-[118px] before:right-0 before:left-0 before:h-30 before:bg-gradient-to-b before:from-transparent before:content-[""]',
        )}
      >
        <div className="container flex h-full w-full flex-col items-center justify-center px-4">
          <SuccessView />
        </div>
      </div>
    </div>
  ),
}
