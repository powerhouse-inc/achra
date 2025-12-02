import React from 'react'
import { TooltipInfoIcon } from './tooltip-info-icon'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta = {
  title: 'Shared/Components/TooltipInfoIcon',
  component: TooltipInfoIcon,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof TooltipInfoIcon>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => (
    <TooltipInfoIcon
      tooltipContent="
   Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, urna eu
          tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisl quis neque."
    />
  ),
  args: {
    tooltipContent: 'Tooltip Content',
  },
}
