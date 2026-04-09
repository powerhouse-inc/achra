'use client'

import { ServerCrash } from 'lucide-react'
import { useState } from 'react'
import { ErrorBoundaryWithPresets } from './error-boundry-with-presets'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

/**
 * Error Boundary with Presets Component
 *
 * A React Error Boundary wrapper that catches JavaScript errors anywhere in the child
 * component tree and displays a SmartErrorState as the fallback UI. Allows you to
 * customize the error state appearance with preset icon, title, and description.
 *
 * ## Usage
 *
 * ### Import
 * ```tsx
 * import { ErrorBoundaryWithPresets } from '@/modules/shared/components/error-state'
 * ```
 *
 * ### Basic Usage
 * ```tsx
 * <ErrorBoundaryWithPresets>
 *   <YourComponent />
 * </ErrorBoundaryWithPresets>
 * ```
 *
 * ### With Custom Error State
 * ```tsx
 * <ErrorBoundaryWithPresets
 *   icon={AlertCircle}
 *   title="Component error"
 *   description="Something went wrong with this component."
 * >
 *   <YourComponent />
 * </ErrorBoundaryWithPresets>
 * ```
 */
const meta = {
  title: 'Shared/Components/ErrorState/ErrorBoundaryWithPresets',
  component: ErrorBoundaryWithPresets,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    children: {
      control: false,
      description: 'Child components to wrap with error boundary.',
    },
    icon: {
      control: false,
      description: 'Custom Lucide icon for the error state fallback.',
    },
    title: {
      control: 'text',
      description: 'Custom title for the error state fallback.',
    },
    description: {
      control: 'text',
      description: 'Custom description for the error state fallback.',
    },
  },
  args: {
    children: null,
  },
} satisfies Meta<typeof ErrorBoundaryWithPresets>

export default meta
type Story = StoryObj<typeof meta>

// Helper component that throws an error for demonstration
function ErrorThrowingComponent({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) {
    throw new Error('This is a test error for the error boundary!')
  }
  return <div className="p-4 text-center">Component rendered successfully</div>
}

export const Default: Story = {
  render: () => (
    <ErrorBoundaryWithPresets>
      <div className="p-4 text-center">This component renders normally</div>
    </ErrorBoundaryWithPresets>
  ),
}

export const WithError: Story = {
  render: () => (
    <ErrorBoundaryWithPresets>
      <ErrorThrowingComponent shouldThrow={true} />
    </ErrorBoundaryWithPresets>
  ),
}

export const WithCustomErrorState: Story = {
  render: () => (
    <ErrorBoundaryWithPresets
      icon={ServerCrash}
      title="Critical error"
      description="A critical error occurred. Please contact support if this persists."
    >
      <ErrorThrowingComponent shouldThrow={true} />
    </ErrorBoundaryWithPresets>
  ),
}

/**
 * Interactive demo showing how the error boundary catches errors. Click the button to trigger an error.
 */
export const InteractiveDemo: Story = {
  render: () => {
    const [shouldThrow, setShouldThrow] = useState(false)

    return (
      <ErrorBoundaryWithPresets>
        <div className="space-y-4 p-4">
          <button
            onClick={() => {
              setShouldThrow(true)
            }}
            className="bg-destructive text-destructive-foreground rounded px-4 py-2"
          >
            Trigger Error
          </button>
          <ErrorThrowingComponent shouldThrow={shouldThrow} />
        </div>
      </ErrorBoundaryWithPresets>
    )
  },
}
