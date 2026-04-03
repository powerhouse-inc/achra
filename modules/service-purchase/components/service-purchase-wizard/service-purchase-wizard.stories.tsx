import { SERVICES_DATA } from '@/modules/service-purchase/mocks/mock-data'
import {
  mockResourceTemplate,
  mockServicePurchaseOperator,
} from '@/modules/service-purchase/mocks/resource-template'
import { ServicePurchaseStoreProvider } from '@/modules/service-purchase/providers/service-purchase-store-provider'
import { ServicePurchaseStep } from '@/modules/service-purchase/types'
import {
  withNuqsAdapter,
  withPortalFontStyles,
  withReactQueryProvider,
} from '@/modules/shared/lib/decorators'
import { ServicePurchaseWizard } from './service-purchase-wizard'
import { SetPurchaseStepForStory } from './set-purchase-step-for-story'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/ServicePurchase/Components/ServicePurchaseWizard',
  component: ServicePurchaseWizard,
  parameters: {
    layout: 'fullscreen',
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

/** Product info step: full `ServiceInfo`, “Select an operator”, no nav buttons. */
export const Default: Story = {}

/**
 * Configure-services step: compact header, operator badge, Back/Continue, and catalog inside Suspense.
 * Captures wizard chrome after product info for visual regression.
 */
export const ConfigureServices: Story = {
  decorators: [
    (Story) => (
      <SetPurchaseStepForStory step={ServicePurchaseStep.ConfigureServices}>
        <Story />
      </SetPurchaseStepForStory>
    ),
  ],
}
