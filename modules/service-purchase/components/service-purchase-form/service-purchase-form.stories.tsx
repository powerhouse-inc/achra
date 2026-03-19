import { SERVICES_DATA } from '@/modules/service-purchase/mocks/mock-data'
import {
  mockResourceTemplate,
  mockServicePurchaseOperator,
} from '@/modules/service-purchase/mocks/resource-template'
import { ServicePurchaseStoreProvider } from '@/modules/service-purchase/providers/service-purchase-store-provider'
import {
  withNextjsExtras,
  withNuqsAdapter,
  withPortalFontStyles,
  withReactQueryProvider,
} from '@/modules/shared/lib/decorators'
import { ServicePurchaseForm } from './service-purchase-form'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Service Purchase/Components/ServicePurchaseForm',
  component: ServicePurchaseForm,
  parameters: {
    layout: 'padded',
    nextjs: {
      appDirectory: true,
      navigation: { pathname: '/services/c6aacdfe-b182-4ec5-8a4c-dbf9f21708f8/purchase' },
    },
  },
  decorators: [
    withPortalFontStyles,
    withNextjsExtras,
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
} satisfies Meta<typeof ServicePurchaseForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
