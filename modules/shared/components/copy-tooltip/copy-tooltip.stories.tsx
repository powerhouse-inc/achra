import React, { useState } from 'react'
import { CopyTooltip } from './copy-tooltip'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta = {
  title: 'Shared/Components/Copy Tooltip',
  component: CopyTooltip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A copy tooltip component that combines a button with a tooltip for copy functionality. Includes hover states, click handlers, and customizable icons.',
      },
    },
  },
  argTypes: {
    tooltip: {
      control: 'text',
      description: 'The tooltip text to display on hover',
    },
    tooltipClassName: {
      control: 'text',
      description: 'Additional CSS classes for the tooltip content',
    },
    onTriggerClick: {
      action: 'clicked',
      description: 'Function called when the button is clicked',
    },
    onTriggerMouseEnter: {
      action: 'mouseEnter',
      description: 'Function called when mouse enters the button',
    },
    onTriggerMouseLeave: {
      action: 'mouseLeave',
      description: 'Function called when mouse leaves the button',
    },
  },
  args: {
    tooltip: 'Copy to clipboard',
    onTriggerClick: () => {
      console.log('Copy clicked')
    },
    onTriggerMouseEnter: () => {
      console.log('Mouse entered')
    },
    onTriggerMouseLeave: () => {
      console.log('Mouse left')
    },
  },
} satisfies Meta<typeof CopyTooltip>

export default meta
type Story = StoryObj<typeof meta>

export const InteractiveExample: Story = {
  render: () => {
    const [tooltip, setTooltip] = useState<string | null>(null)

    const handleCopy = () => {
      void navigator.clipboard.writeText('Sample text to copy')
      setTooltip('Copied!')
    }

    const handleMouseEnter = () => {
      setTooltip('Copy')
    }

    const handleMouseLeave = () => {
      setTooltip(null)
    }

    return (
      <CopyTooltip
        open={!!tooltip}
        tooltip={tooltip}
        onTriggerClick={handleCopy}
        onTriggerMouseEnter={handleMouseEnter}
        onTriggerMouseLeave={handleMouseLeave}
      />
    )
  },
}
