import { SERVICES_DATA } from '@/modules/service-purchase/mocks/mock-data'
import { ServicePurchaseStoreProvider } from '@/modules/service-purchase/providers/service-purchase-store-provider'
import { withNextjsExtras, withPortalFontStyles } from '@/modules/shared/lib/decorators'
import { FacetSelectionSection } from './facet-selection-section'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Service Purchase/Components/FacetSelectionSection',
  component: FacetSelectionSection,
  parameters: {
    layout: 'centered',
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
} satisfies Meta<typeof FacetSelectionSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
