import { SERVICES_DATA } from '@/modules/service-purchase/mocks/mock-data'
import {
  mockResourceTemplate,
  mockServicePurchaseOperator,
} from '@/modules/service-purchase/mocks/resource-template'
import { ServicePurchaseStoreProvider } from '@/modules/service-purchase/providers/service-purchase-store-provider'
import {
  withNuqsAdapter,
  withPortalFontStyles,
  withReactQueryProvider,
} from '@/modules/shared/lib/decorators'
import { ServicePurchaseWizard } from './service-purchase-wizard'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/ServicePurchase/Components/ServicePurchaseWizard',
  component: ServicePurchaseWizard,
  parameters: {
    layout: 'padded',
    nextjs: {
      appDirectory: true,
      navigation: { pathname: '/services/c6aacdfe-b182-4ec5-8a4c-dbf9f21708f8/purchase' },
    },
  },
  argTypes: {
    resourceTemplate: {
      description: 'Resource template configuration',
    },
    operator: {
      description: 'Service operator/builder profile',
    },
  },
  decorators: [
    withPortalFontStyles,
    withNuqsAdapter,
    withReactQueryProvider,
    (Story) => (
      <ServicePurchaseStoreProvider services={SERVICES_DATA[0]}>
        <Story />
      </ServicePurchaseStoreProvider>
    ),
  ],
  args: {
    resourceTemplate: mockResourceTemplate,
    operator: mockServicePurchaseOperator,
  },
} satisfies Meta<typeof ServicePurchaseWizard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
