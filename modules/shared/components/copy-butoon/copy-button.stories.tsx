import { CheckCircle, Copy } from 'lucide-react'
import { CopyAnimatedIcon, CopyButton, CopyTooltip, CopyTrigger } from './copy-button'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta: Meta<typeof CopyButton> = {
  title: 'Shared/Components/CopyButton',
  component: CopyButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A flexible, composable copy-to-clipboard button component that provides visual feedback through tooltips and animated icons. Built with a composition pattern for maximum flexibility, allowing you to mix and match features as needed.\n\n**Composition Pattern:**\n- `CopyButton.Root` - Required wrapper that provides context and manages copy state\n- `CopyButton.Trigger` - The clickable element that triggers the copy action (renders a Button by default)\n- `CopyButton.Tooltip` - Optional wrapper that adds tooltip feedback (use with any child content)\n- `CopyButton.AnimatedIcon` - Optional animated icon that transitions between Copy and a custom icon (defaults to Check). Accepts a `copiedIcon` prop to customize the copied state icon\n\n**Need something other than a button?** Set `asChild` on `CopyButton.Trigger` to render any tag or component (e.g. `span`, `a`, custom components). All `Button` props (like `variant`, `size`, `onClick`) are forwarded to the child via Radix Slot, so styles and behavior are preserved.\n\nCombine these subcomponents to create a clipboard copy button with custom icon feedback.',
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
type Story = StoryObj<typeof CopyButton>

/**
 * Copy button with tooltip feedback but without icon animation.
 * The icon remains static while the tooltip changes from "Copy" to "Copied!" when clicked.
 * Ideal for scenarios where you want clear text feedback without icon animations.
 */
export const WithTooltip: Story = {
  render: (args) => (
    <CopyButton {...args}>
      <CopyTooltip tooltip="Copy" copiedTooltip="Copied!">
        <CopyTrigger>
          <Copy />
        </CopyTrigger>
      </CopyTooltip>
    </CopyButton>
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
    <CopyButton {...args}>
      <CopyTrigger>
        <CopyAnimatedIcon className="size-4" />
      </CopyTrigger>
    </CopyButton>
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
    <CopyButton {...args}>
      <CopyTrigger>
        <CopyAnimatedIcon className="size-4" copiedIcon={CheckCircle} />
      </CopyTrigger>
    </CopyButton>
  ),
  args: {
    value: '0x1234567890abcdef1234567890abcdef12345680',
  },
}

/**
 * Demonstrates rendering a non-button element using `asChild`.
 * All Button props are forwarded to the child via Slot, preserving styles and behavior.
 */
export const AsChildWithCustomElement: Story = {
  render: (args) => (
    <CopyButton {...args}>
      <CopyTooltip tooltip="Copy" copiedTooltip="Copied!">
        <CopyTrigger asChild variant="outline" size="sm">
          <span className="inline-flex items-center gap-1.5 select-none">Copy address</span>
        </CopyTrigger>
      </CopyTooltip>
    </CopyButton>
  ),
  args: {
    value: '0x1234567890abcdef1234567890abcdef12345681',
  },
}
