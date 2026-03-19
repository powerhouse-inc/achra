import { mockServicePurchaseOperator } from '@/modules/service-purchase/mocks/resource-template'
import { withNextjsExtras, withPortalFontStyles } from '@/modules/shared/lib/decorators'
import { MarketplaceHeader } from './marketplace-header'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Service Purchase/Components/MarketplaceHeader',
  component: MarketplaceHeader,
  parameters: {
    layout: 'centered',
    nextjs: { appDirectory: true },
  },
  decorators: [withPortalFontStyles, withNextjsExtras],
  args: {
    operator: mockServicePurchaseOperator,
  },
} satisfies Meta<typeof MarketplaceHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithIcon: Story = {
  args: {
    operator: {
      ...mockServicePurchaseOperator,
      icon: 'https://pbs.twimg.com/profile_images/1663915112837652480/pUIOaWoC_400x400.jpg',
    },
  },
}
