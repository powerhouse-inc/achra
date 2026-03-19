import { SERVICES_DATA } from '@/modules/service-purchase/mocks/mock-data'
import { ServicePurchaseStoreProvider } from '@/modules/service-purchase/providers/service-purchase-store-provider'
import { withNextjsExtras, withPortalFontStyles } from '@/modules/shared/lib/decorators'
import { SubmitRequestForm } from './submit-request-form'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Service Purchase/Components/SubmitRequestForm',
  component: SubmitRequestForm,
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
} satisfies Meta<typeof SubmitRequestForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
