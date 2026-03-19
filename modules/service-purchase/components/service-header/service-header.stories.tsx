import { SERVICES_DATA } from '@/modules/service-purchase/mocks/mock-data'
import { mockResourceTemplate } from '@/modules/service-purchase/mocks/resource-template'
import { ServicePurchaseStoreProvider } from '@/modules/service-purchase/providers/service-purchase-store-provider'
import { withNextjsExtras, withPortalFontStyles } from '@/modules/shared/lib/decorators'
import { ServiceHeader } from './service-header'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Service Purchase/Components/ServiceHeader',
  component: ServiceHeader,
  parameters: {
    layout: 'padded',
    nextjs: { appDirectory: true },
  },
  decorators: [
    withPortalFontStyles,
    withNextjsExtras,
    (Story) => (
      <ServicePurchaseStoreProvider services={SERVICES_DATA[0]}>
        <Story />
      </ServicePurchaseStoreProvider>
    ),
  ],
  args: {
    resourceTemplate: mockResourceTemplate,
  },
} satisfies Meta<typeof ServiceHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
