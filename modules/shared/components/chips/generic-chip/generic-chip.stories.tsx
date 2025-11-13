import { GenericChip } from './generic-chip'
import type { Meta, StoryObj } from '@storybook/nextjs'

/**
 * Generic Chip Component
 *
 * A flexible, polymorphic chip component that can render as any HTML element
 * with support for multiple variants, colors, and sizes. This component uses
 * class-variance-authority (CVA) for type-safe variant management.
 *
 * ## Usage
 *
 * ### Import
 * ```tsx
 * import { GenericChip } from '@/modules/shared/components/chips/generic-chip'
 * ```
 *
 * ### Basic Usage
 * ```tsx
 * <GenericChip>Default Chip</GenericChip>
 * ```
 *
 * ### With Variants
 * ```tsx
 * <GenericChip variant="filled" color="blue">Filled Blue</GenericChip>
 * <GenericChip variant="bordered" color="green">Bordered Green</GenericChip>
 * ```
 *
 * ### As Different Elements
 * ```tsx
 * <GenericChip as="button" onClick={handleClick}>Clickable Chip</GenericChip>
 * <GenericChip as="span">Span Chip</GenericChip>
 * ```
 */

const meta = {
  title: 'Shared/Components/Chips/GenericChip',
  component: GenericChip,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    as: {
      control: 'select',
      options: ['div', 'span', 'button', 'a'],
      description: 'The HTML element to render as',
    },
    variant: {
      control: 'select',
      options: ['filled', 'bordered', 'compact', 'underline', 'capsule'],
      description: 'Visual variant of the chip',
    },
    color: {
      control: 'select',
      options: ['blue', 'yellow', 'orange', 'green', 'red', 'gray', 'purple', 'lime'],
      description: 'Color variant of the chip',
    },
    size: {
      control: 'select',
      options: ['large', 'default', 'small'],
      description: 'Size variant of the chip',
    },
    children: {
      control: 'text',
      description: 'Content to display inside the chip',
    },
  },
  args: {
    children: 'Generic Chip',
    variant: 'filled',
    color: 'blue',
    size: 'default',
    as: 'button',
  },
} satisfies Meta<typeof GenericChip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const MatixVariants: Story = {
  argTypes: {
    variant: {
      table: { disable: true },
      control: false,
      readonly: true,
    },
    color: {
      table: { disable: true },
      control: false,
      readonly: true,
    },
  },
  args: {
    size: 'default',
  },
  render: (args) => (
    <div className="flex flex-col gap-6">
      {['filled', 'bordered', 'compact', 'underline', 'capsule'].map((variant) => (
        <div key={variant}>
          <h3 className="text-sm font-medium">Variant: {variant}</h3>
          <div className="flex gap-4">
            {['blue', 'yellow', 'orange', 'green', 'red', 'gray', 'purple', 'lime'].map((color) => (
              <GenericChip variant={variant} color={color} size={args.size} key={color}>
                Generic Chip
              </GenericChip>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
}
