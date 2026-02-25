'use client'
import { SERVICES_DATA } from '@/modules/service-purchase/mocks/mock-data'
import { ServicePurchaseStoreProvider } from '@/modules/service-purchase/providers/service-purchase-store-provider'
import { BillingPeriodSelector } from './billing-period-selector'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta = {
  title: 'Modules/Services/Components/BillingPeriodSelector',
  component: BillingPeriodSelector,
  parameters: {
    layout: 'centered',
    nextjs: { appDirectory: true },
  },
} satisfies Meta<typeof BillingPeriodSelector>

export default meta
type Story = StoryObj<typeof meta>

/**
 * All available billing cycles rendered with discount badges.
 * The Basic tier has Monthly, Quarterly, SemiAnnual and Annual cycles,
 * which triggers all three discount labels (5%, 10%, 20%).
 */
export const Default: Story = {
  decorators: [
    (Story) => (
      <ServicePurchaseStoreProvider services={SERVICES_DATA[0]}>
        <Story />
      </ServicePurchaseStoreProvider>
    ),
  ],
}
