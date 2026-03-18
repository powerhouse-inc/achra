import React from 'react'

import { UsdsTooltip } from './usds-tooltip'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Finances/SummarySection/UsdsTooltip',
  component: UsdsTooltip,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof UsdsTooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => <UsdsTooltip />,
}
