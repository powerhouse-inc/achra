import { SERVICES_DATA } from '@/modules/service-purchase/mocks/mock-data'
import { ServicePurchaseStoreProvider } from '@/modules/service-purchase/providers/service-purchase-store-provider'
import { withPortalFontStyles } from '@/modules/shared/lib/decorators'
import { FacetSelectionSection } from './facet-selection-section'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/ServicePurchase/Components/FacetSelectionSection',
  component: FacetSelectionSection,
  parameters: {
    layout: 'centered',
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
} satisfies Meta<typeof FacetSelectionSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
