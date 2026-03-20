import { MetricCard, MetricCardLabel } from './metric-card'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Project/Components/MetricCard',
  component: MetricCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes for the card',
    },
  },
} satisfies Meta<typeof MetricCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <MetricCard className="min-w-48">
      <MetricCardLabel>Budget</MetricCardLabel>
      <span className="text-base font-semibold">$50,000</span>
    </MetricCard>
  ),
}

export const WithMultipleLabels: Story = {
  render: () => (
    <MetricCard className="min-w-64">
      <div className="flex flex-col gap-2">
        <MetricCardLabel>Key Results</MetricCardLabel>
        <div className="text-base font-semibold">12 / 15</div>
      </div>
    </MetricCard>
  ),
}
