import React from 'react'
import { MetricCard } from './metric-card'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta = {
  title: 'Modules/Project/Components/MetricCard',
  component: MetricCard,
} satisfies Meta<typeof MetricCard>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: (args) => <MetricCard {...args} />,
  args: {
    label: 'Budget',
    value: '100K',
    unit: 'USD',
    footer: 'CAPEX',
  },
}
