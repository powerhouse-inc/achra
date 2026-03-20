import { http, HttpResponse } from 'msw'
import { SERVICES_DATA } from '@/modules/service-purchase/mocks/mock-data'
import { ServicePurchaseStoreProvider } from '@/modules/service-purchase/providers/service-purchase-store-provider'
import { withPortalFontStyles } from '@/modules/shared/lib/decorators'
import { SubmitRequestForm } from './submit-request-form'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/ServicePurchase/Components/SubmitRequestForm',
  component: SubmitRequestForm,
  parameters: {
    layout: 'padded',
    nextjs: { appDirectory: true },
  },
  argTypes: {},
  decorators: [
    withPortalFontStyles,
    (Story) => (
      <ServicePurchaseStoreProvider services={SERVICES_DATA[0]}>
        <Story />
      </ServicePurchaseStoreProvider>
    ),
  ],
} satisfies Meta<typeof SubmitRequestForm>

export default meta
type Story = StoryObj<typeof meta>

const createProductInstancesHandler = http.post(process.env.NEXT_PUBLIC_SWITCHBOARD_URL, () =>
  HttpResponse.json({
    data: {
      createProductInstances: {
        success: true,
        errors: [],
        data: { linkToDrive: 'https://drive.example.com/request' },
      },
    },
  }),
)

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [createProductInstancesHandler],
    },
  },
}
