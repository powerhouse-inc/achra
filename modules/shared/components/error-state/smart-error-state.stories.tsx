import { AlertCircle, XCircle } from 'lucide-react'
import { SmartErrorState } from './smart-error-state'
import type { Meta, StoryObj } from '@storybook/nextjs'

/**
 * Smart Error State Component
 *
 * An intelligent error state component that automatically selects between GenericErrorState
 * and NetworkErrorState based on the user's network connectivity. When offline, it displays
 * the network error state. When online, it displays a generic error state with customizable
 * icon, title, and description.
 *
 * ## Usage
 *
 * ### Import
 * ```tsx
 * import { SmartErrorState } from '@/modules/shared/components/error-state'
 * ```
 *
 * ### Basic Usage
 * ```tsx
 * <SmartErrorState />
 * ```
 *
 * ### With Custom Content
 * ```tsx
 * <SmartErrorState
 *   icon={AlertCircle}
 *   title="Failed to load data"
 *   description="We couldn't retrieve the information. Please try again."
 * />
 * ```
 *
 * ## Behavior
 *
 * - When offline: Automatically shows NetworkErrorState with connection status indicator
 * - When online: Shows GenericErrorState with your custom icon, title, and description
 * - Custom props (icon, title, description) only apply when online
 *
 * ## Notes
 *
 * This component checks `navigator.onLine` to determine network status. In Storybook,
 * the network state reflects the actual browser connection status. To test offline behavior,
 * you may need to use browser DevTools to simulate offline mode.
 */

const meta = {
  title: 'Shared/Components/ErrorState/SmartErrorState',
  component: SmartErrorState,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    icon: {
      control: false,
      description:
        'Custom Lucide icon to display when online. Ignored when offline (shows network error).',
    },
    title: {
      control: 'text',
      description: 'Error title text when online. Ignored when offline (shows network error).',
    },
    description: {
      control: 'text',
      description:
        'Error description text when online. Ignored when offline (shows network error).',
    },
    showBorder: {
      control: 'boolean',
      description: 'Whether to show a border around the error state. Defaults to true.',
    },
  },
} satisfies Meta<typeof SmartErrorState>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const WithCustomProps: Story = {
  args: {
    icon: AlertCircle,
    title: 'Failed to load data',
    description: 'We encountered an issue while processing your request. Please try again later.',
    showBorder: true,
  },
}

export const WithoutBorder: Story = {
  args: {
    showBorder: false,
  },
}

export const WithCustomIcon: Story = {
  args: {
    icon: XCircle,
    title: 'Connection error',
    description: 'Unable to connect to the server. Please check your connection and try again.',
  },
}
