import { Button } from '../ui/button'
import { CopyButton } from './copy-button'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta: Meta<typeof CopyButton> = {
  title: 'Shared/Components/CopyButton',
  component: CopyButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A reusable copy button component with tooltip functionality that copies text to clipboard.',
      },
    },
  },
  argTypes: {
    value: {
      control: 'text',
      description: 'The text value to copy to clipboard',
    },
    tooltip: {
      control: 'text',
      description: 'Tooltip text shown on hover',
    },
    copiedTooltip: {
      control: 'text',
      description: 'Tooltip text shown after copying',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof CopyButton>

export const Default: Story = {
  args: {
    value: '0x1234567890abcdef1234567890abcdef12345678',
  },
}

export const WithCustomTooltips: Story = {
  args: {
    value: 'custom-value-to-copy',
    tooltip: 'Click to copy this value',
    copiedTooltip: 'Successfully copied!',
  },
}

export const WithCustomButton: Story = {
  args: {
    value: 'custom-button-value',
    tooltip: 'Copy with custom button',
    copiedTooltip: 'Copied with custom button!',
    children: <Button>Custom Copy Button</Button>,
  },
}
