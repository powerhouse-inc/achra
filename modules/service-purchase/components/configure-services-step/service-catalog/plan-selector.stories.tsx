import { RsBillingCycle } from '@/modules/__generated__/graphql/switchboard-generated'
import { mockPlanSelectorTier } from '@/modules/service-purchase/mocks/plan-selector'
import { PricingCalculatorProvider } from '@/modules/service-purchase/providers/pricing-calculator-provider'
import { RadioGroup } from '@/modules/shared/components/ui/radio-group'
import { PlanSelectorItem } from './plan-selector'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/ServicePurchase/Components/PlanSelector',
  component: PlanSelectorItem,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
  argTypes: {
    tier: {
      description: 'Service subscription tier configuration',
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

export const Unselected: Story = {
  name: 'Generic - UnSelected',
  args: {
    tier: mockPlanSelectorTier,
  },
  render: (args) => (
    <RadioGroup value="" className="inline-flex">
      <PlanSelectorItem {...args} />
    </RadioGroup>
  ),
}

export const Selected: Story = {
  name: 'Generic - Selected',
  args: {
    tier: mockPlanSelectorTier,
  },
  render: (args) => (
    <RadioGroup value={args.tier.id} className="inline-flex">
      <PlanSelectorItem {...args} />
    </RadioGroup>
  ),
}
