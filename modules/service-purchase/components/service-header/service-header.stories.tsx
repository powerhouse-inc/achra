import { SERVICES_DATA } from '@/modules/service-purchase/mocks/mock-data'
import { mockResourceTemplate } from '@/modules/service-purchase/mocks/resource-template'
import { ServicePurchaseStoreProvider } from '@/modules/service-purchase/providers/service-purchase-store-provider'
import { withPortalFontStyles } from '@/modules/shared/lib/decorators'
import { ServiceHeader } from './service-header'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/ServicePurchase/Components/ServiceHeader',
  component: ServiceHeader,
  parameters: {
    layout: 'padded',
    nextjs: { appDirectory: true },
  },
  argTypes: {
    resourceTemplate: {
      description: 'Resource template configuration',
    },
  },
  decorators: [
    withPortalFontStyles,
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
