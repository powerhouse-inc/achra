import { NetworkErrorState } from './network-error-state'
import type { Meta, StoryObj } from '@storybook/nextjs'

/**
 * Network Error State Component
 *
 * A specialized error state component that displays when the user is offline or experiencing
 * network connectivity issues. It automatically detects network status and shows a connection
 * indicator badge that updates based on the current network state.
 *
 * ## Usage
 *
 * ### Import
 * ```tsx
 * import { NetworkErrorState } from '@/modules/shared/components/error-state'
 * ```
 *
 * ### Basic Usage
 * ```tsx
 * <NetworkErrorState />
 * ```
 *
 * ### Without Border
 * ```tsx
 * <NetworkErrorState showBorder={false} />
 * ```
 *
 * ## Notes
 *
 * This component uses the `useNetworkState` hook from `react-use` to automatically detect
 * network connectivity. The connection status badge will update in real-time as the network
 * state changes. In Storybook, the network state reflects the actual browser connection status.
 */

const meta = {
  title: 'Shared/Components/ErrorState/NetworkErrorState',
  component: NetworkErrorState,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    showBorder: {
      control: 'boolean',
      description: 'Whether to show a border around the error state. Defaults to true.',
    },
  },
} satisfies Meta<typeof NetworkErrorState>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const WithoutBorder: Story = {
  args: {
    showBorder: false,
  },
}
