import React from 'react'

import { withPortalFontStyles } from '@/modules/shared/lib/decorators'
import { UsdsTooltip } from './usds-tooltip'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Finances/Components/SummarySection/UsdsTooltip',
  component: UsdsTooltip,
  decorators: [withPortalFontStyles],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof UsdsTooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <UsdsTooltip />,
}
