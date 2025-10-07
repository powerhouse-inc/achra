import React from 'react'

import { ThemeProvider } from '@/modules/shared/providers/theme-provider'
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
  render: () => (
    <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
      <CardStackedAreaChart />
    </ThemeProvider>
  ),
}

export const Dark: Story = {
  render: () => (
    <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
      <CardStackedAreaChart />
    </ThemeProvider>
  ),
}
