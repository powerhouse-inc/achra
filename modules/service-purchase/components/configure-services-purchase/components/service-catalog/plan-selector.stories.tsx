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
} satisfies Meta<typeof PlanSelectorItem>

export default meta
type Story = StoryObj<typeof meta>
export const Selected: Story = {
  name: 'Generic - UnSelected',
  args: {
    tier: {
      description: '',
      id: '1',
      name: 'Pro Plan',
      isCustomPricing: false,
      pricing: {
        amount: 59,
        currency: 'USD',
      },
      billingCycleDiscounts: [],
      usageLimits: [],
      serviceLevels: [],
    },
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
    tier: {
      description: '',
      id: '1',
      name: 'Pro Plan',
      isCustomPricing: false,
      pricing: {
        amount: 59,
        currency: 'USD',
      },
      billingCycleDiscounts: [],
      usageLimits: [],
      serviceLevels: [],
    },
  },
  render: (args) => (
    <RadioGroup value={args.tier.name} className="inline-flex">
      <PlanSelectorItem {...args} />
    </RadioGroup>
  ),
}
