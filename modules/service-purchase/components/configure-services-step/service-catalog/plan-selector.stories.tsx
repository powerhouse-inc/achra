import {
  RsBillingCycle,
  type RsServiceSubscriptionTier,
} from '@/modules/__generated__/graphql/switchboard-generated'
import { PricingCalculatorProvider } from '@/modules/service-purchase/providers/pricing-calculator-provider'
import { RadioGroup } from '@/modules/shared/components/ui/radio-group'
import { PlanSelectorItem } from './plan-selector'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta = {
  title: 'Modules/Services/Components/PlanSelector',
  component: PlanSelectorItem,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    (Story) => (
      <PricingCalculatorProvider
        value={{
          activePlan: '',
          onPrevPlan: () => {},
          onNextPlan: () => {},
          tierNames: ['1'],
          tiers: [],
          selectedBillingCycle: RsBillingCycle.Monthly,
          tierHeaderPrices: { '1': 59 },
        }}
      >
        <Story />
      </PricingCalculatorProvider>
    ),
  ],
} satisfies Meta<typeof PlanSelectorItem>

export default meta
type Story = StoryObj<typeof meta>

const baseTier = {
  description: '',
  id: '1',
  name: 'Pro Plan',
  isCustomPricing: false,
  billingCycleDiscounts: [],
  pricing: {
    amount: 59,
    currency: 'USD',
  },
  usageLimits: [],
  serviceLevels: [],
} satisfies RsServiceSubscriptionTier

export const Selected: Story = {
  name: 'Generic - UnSelected',
  args: {
    tier: baseTier,
  },
  render: (args) => (
    <RadioGroup value="" className="inline-flex">
      <PlanSelectorItem {...args} />
    </RadioGroup>
  ),
}

export const Unselected: Story = {
  name: 'Generic - Selected',
  args: {
    tier: baseTier,
  },
  render: (args) => (
    <RadioGroup value={args.tier.id} className="inline-flex">
      <PlanSelectorItem {...args} />
    </RadioGroup>
  ),
}
