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
    value: 'basic',
    label: 'Basic Plan',
    description: '$29/month',
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
    value: 'premium',
    label: 'Pro Plan',
    description: '$59/month',
  },
  render: (args) => (
    <RadioGroup value={args.value} className="inline-flex">
      <PlanSelectorItem {...args} />
    </RadioGroup>
  ),
}
