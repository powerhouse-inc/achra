import React from 'react'

import { CardBarChart } from './card-bar-chart'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Networks/Components/CardBarChart',
  component: CardBarChart,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof CardBarChart>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <CardBarChart />,
}
