import { CheckCircle, Copy } from 'lucide-react'
import { CopyButton } from './copy-button'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta: Meta<typeof CopyButton.Root> = {
  title: 'Shared/Components/CopyButton',
  component: CopyButton.Root,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A flexible, composable copy-to-clipboard button component that provides visual feedback through tooltips and animated icons. Built with a composition pattern for maximum flexibility, allowing you to mix and match features as needed.\n\n**Composition Pattern:**\n- `CopyButton.Root` - Required wrapper that provides context and manages copy state\n- `CopyButton.Trigger` - The clickable button element that triggers the copy action\n- `CopyButton.Tooltip` - Optional wrapper that adds tooltip feedback (use with any child content)\n- `CopyButton.AnimatedIcon` - Optional animated icon that transitions between Copy and a custom icon (defaults to Check). Accepts a `copiedIcon` prop to customize the copied state icon\n\nCombine these subcomponents to create a clipboard copy button with custom icon feedback.',
      },
    },
  },
  argTypes: {
    value: {
      control: 'text',
      description: 'The text value to copy to the clipboard when the button is clicked',
    },
    resetDelay: {
      control: 'number',
      description: 'Delay in milliseconds before resetting the copied state',
      defaultValue: 2000,
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof CopyButton.Root>

/**
 * Copy button with tooltip feedback but without icon animation.
 * The icon remains static while the tooltip changes from "Copy" to "Copied!" when clicked.
 * Ideal for scenarios where you want clear text feedback without icon animations.
 */
export const WithTooltip: Story = {
  render: (args) => (
    <CopyButton.Root {...args}>
      <CopyButton.Tooltip tooltip="Copy" copiedTooltip="Copied!">
        <CopyButton.Trigger>
          <Copy />
        </CopyButton.Trigger>
      </CopyButton.Tooltip>
    </CopyButton.Root>
  ),
  args: {
    value: '0x1234567890abcdef1234567890abcdef12345678',
  },
}

/**
 * Copy button with animated icon feedback but without tooltip.
 * The icon smoothly animates from Copy to Check when clicked, providing immediate visual feedback.
 * Ideal for scenarios where you prefer icon-based feedback over tooltip messages.
 */
export const WithIconChange: Story = {
  render: (args) => (
    <CopyButton.Root {...args}>
      <CopyButton.Trigger>
        <CopyButton.AnimatedIcon className="size-4" />
      </CopyButton.Trigger>
    </CopyButton.Root>
  ),
  args: {
    value: '0x1234567890abcdef1234567890abcdef12345679',
  },
}

/**
 * Copy button with custom icon for the copied state.
 * The icon animates from Copy to CheckCircle (instead of the default Check) when clicked.
 * Demonstrates how to customize the copied icon by passing the `copiedIcon` prop.
 */
export const WithCustomCopiedIcon: Story = {
  render: (args) => (
    <CopyButton.Root {...args}>
      <CopyButton.Trigger>
        <CopyButton.AnimatedIcon className="size-4" copiedIcon={CheckCircle} />
      </CopyButton.Trigger>
    </CopyButton.Root>
  ),
  args: {
    value: '0x1234567890abcdef1234567890abcdef12345680',
  },
}
