import { SERVICES_DATA } from '@/modules/service-purchase/mocks/mock-data'
import { ServicePurchaseStoreProvider } from '@/modules/service-purchase/providers/service-purchase-store-provider'
import { withNextjsExtras, withPortalFontStyles } from '@/modules/shared/lib/decorators'
import { SummaryCard } from './summary-card'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Service Purchase/Components/SummaryCard',
  component: SummaryCard,
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
    templateTitle: 'Operational Hub',
  },
} satisfies Meta<typeof SummaryCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
