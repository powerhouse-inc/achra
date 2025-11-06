import { AlertCircle, XCircle } from 'lucide-react'
import { GenericErrorState } from './generic-error-state'
import type { Meta, StoryObj } from '@storybook/nextjs'

/**
 * Generic Error State Component
 *
 * A reusable error state component that displays an error message with an optional icon,
 * title, and description. Used throughout the application to show error states when
 * something goes wrong.
 *
 * ## Usage
 *
 * ### Import
 * ```tsx
 * import { GenericErrorState } from '@/modules/shared/components/error-state'
 * ```
 *
 * ### Basic Usage
 * ```tsx
 * <GenericErrorState />
 * ```
 *
 * ### With Custom Content
 * ```tsx
 * <GenericErrorState
 *   icon={AlertCircle}
 *   title="Failed to load data"
 *   description="We couldn't retrieve the information. Please try again."
 * />
 * ```
 */

const meta = {
  title: 'Shared/Components/ErrorState/GenericErrorState',
  component: GenericErrorState,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    icon: {
      control: false,
      description: 'Custom Lucide icon to display. Defaults to ServerCrash if not provided.',
    },
    title: {
      control: 'text',
      description: 'Error title text. Defaults to "Something went wrong" if not provided.',
    },
    description: {
      control: 'text',
      description: 'Error description text. Defaults to a generic error message if not provided.',
    },
    showBorder: {
      control: 'boolean',
      description: 'Whether to show a border around the error state. Defaults to true.',
    },
  },
} satisfies Meta<typeof GenericErrorState>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const WithCustomIcon: Story = {
  args: {
    icon: AlertCircle,
  },
}

export const WithCustomTitle: Story = {
  args: {
    title: 'Failed to load data',
  },
}

export const WithCustomDescription: Story = {
  args: {
    description: 'We encountered an issue while processing your request. Please try again later.',
  },
}

export const WithoutBorder: Story = {
  args: {
    showBorder: false,
  },
}

export const FullyCustomized: Story = {
  args: {
    icon: XCircle,
    title: 'Unable to connect',
    description:
      'We could not establish a connection to the server. Please check your network settings and try again.',
    showBorder: true,
  },
}
