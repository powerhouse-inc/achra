import React from 'react'

import { CardStackedAreaChart } from './card-stacked-area-chart'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta = {
  title: 'Modules/Networks/Components/CardStackedAreaChart',
  component: CardStackedAreaChart,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof CardStackedAreaChart>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => <CardStackedAreaChart />,
}
