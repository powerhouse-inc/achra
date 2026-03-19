import { SERVICES_DATA } from '@/modules/service-purchase/mocks/mock-data'
import { ServicePurchaseStoreProvider } from '@/modules/service-purchase/providers/service-purchase-store-provider'
import { withNextjsExtras, withPortalFontStyles } from '@/modules/shared/lib/decorators'
import { Tabs } from '@/modules/shared/components/ui/tabs'
import { StepsTriggersList } from './steps-triggers-list'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Service Purchase/Components/StepsTriggersList',
  component: StepsTriggersList,
  parameters: {
    layout: 'padded',
    nextjs: { appDirectory: true },
  },
  decorators: [
    withPortalFontStyles,
    withNextjsExtras,
    (Story) => (
      <ServicePurchaseStoreProvider services={SERVICES_DATA[0]}>
        <Tabs value="product-info">
          <Story />
        </Tabs>
      </ServicePurchaseStoreProvider>
    ),
  ],
} satisfies Meta<typeof StepsTriggersList>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
