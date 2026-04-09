import { Identicon } from './identicon'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

/**
 * Identicon Component
 *
 * A component that generates Ethereum-style blockie identicons from any string value.
 * Uses the ethereum-blockies-base64 library to create unique, deterministic visual
 * representations of addresses or other string values.
 *
 * ## Usage
 *
 * ### Import
 * ```tsx
 * import { Identicon } from '@/modules/shared/components/identicon'
 * ```
 *
 * ### Basic Usage
 * ```tsx
 * <Identicon value="0x1234567890123456789012345678901234567890" />
 * ```
 *
 * ### With Custom Size
 * ```tsx
 * <Identicon value="0x1234567890123456789012345678901234567890" className="size-16" />
 * ```
 *
 * ### With Additional Props
 * ```tsx
 * <Identicon
 *   value="0x1234567890123456789012345678901234567890"
 *   className="size-12 border-2 border-gray-300"
 *   title="User Address"
 * />
 * ```
 *
 * ## Features
 * - Generates deterministic blockie images from any string
 * - Automatically falls back to Skeleton component if generation fails
 * - Supports all standard HTML div attributes
 * - Memoized for performance
 */
const meta = {
  title: 'Shared/Components/Identicon',
  component: Identicon,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    value: {
      control: 'text',
      description: 'The string value to generate the identicon from (e.g., Ethereum address)',
    },
    className: {
      control: 'text',
      description:
        'CSS classes to apply to the identicon (use size-* classes for sizing, e.g., size-8, size-16)',
    },
  },
  args: {
    value: '0x1234567890123456789012345678901234567890',
    className: 'size-8',
  },
} satisfies Meta<typeof Identicon>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: '0x1234567890123456789012345678901234567890',
    className: 'size-8',
  },
}

export const SizeComparison: Story = {
  render: () => (
    <div className="flex items-end gap-6">
      <div className="flex flex-col items-center gap-2">
        <Identicon value="0x1234567890123456789012345678901234567890" className="size-4" />
        <span className="text-xs text-gray-500">16px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Identicon value="0x1234567890123456789012345678901234567890" className="size-8" />
        <span className="text-xs text-gray-500">32px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Identicon value="0x1234567890123456789012345678901234567890" className="size-12" />
        <span className="text-xs text-gray-500">48px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Identicon value="0x1234567890123456789012345678901234567890" className="size-16" />
        <span className="text-xs text-gray-500">64px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Identicon value="0x1234567890123456789012345678901234567890" className="size-24" />
        <span className="text-xs text-gray-500">96px</span>
      </div>
    </div>
  ),
}
