import React, { useState } from 'react'
import {
  type CustomItemRenderer,
  type CustomOverflowRenderer,
  MultipleSelector,
  type Option,
} from './multiselect'
import type { Meta, StoryObj } from '@storybook/nextjs'

/**
 * MultipleSelector is a powerful multi-select component built on top of cmdk.
 * It provides a comprehensive solution for selecting multiple options with advanced features.
 *
 * Features:
 * - Multiple selection with visual badges
 * - Search functionality (sync and async)
 * - Grouping options by categories
 * - Creatable options (allow users to create new options)
 * - Fixed options that cannot be removed
 * - Maximum selection limits
 * - Loading and empty states
 * - Keyboard navigation and accessibility
 * - Overflow handling for many selections
 *
 * @component
 */
const meta = {
  title: 'Shared/Components/Form/MultipleSelector',
  component: MultipleSelector,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A comprehensive multi-select component with search, grouping, creatable options, and advanced features for selecting multiple values.',
      },
    },
  },
  argTypes: {
    value: {
      description: 'Array of selected options',
      control: false,
    },
    onChange: {
      description: 'Callback when selection changes',
      action: 'change',
    },
    options: {
      description: 'Array of available options',
      control: false,
    },
    placeholder: {
      description: 'Placeholder text when no options are selected',
      control: 'text',
    },
    disabled: {
      description: 'Whether the component is disabled',
      control: 'boolean',
    },
    maxSelected: {
      description: 'Maximum number of options that can be selected',
      control: 'number',
    },
    groupBy: {
      description: 'Property to group options by',
      control: 'text',
    },
    hideClearAllButton: {
      description: 'Hide the clear all button',
      control: 'boolean',
    },
  },
} satisfies Meta<typeof MultipleSelector>

export default meta
type Story = StoryObj<typeof meta>

// Sample data for stories
const basicOptions: Option[] = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'nextjs', label: 'Next.js' },
  { value: 'nuxt', label: 'Nuxt' },
  { value: 'sveltekit', label: 'SvelteKit' },
  { value: 'remix', label: 'Remix' },
]

const groupedOptions: Option[] = [
  { value: 'react', label: 'React', group: 'Frontend' },
  { value: 'vue', label: 'Vue', group: 'Frontend' },
  { value: 'angular', label: 'Angular', group: 'Frontend' },
  { value: 'svelte', label: 'Svelte', group: 'Frontend' },
  { value: 'nodejs', label: 'Node.js', group: 'Backend' },
  { value: 'express', label: 'Express', group: 'Backend' },
  { value: 'fastify', label: 'Fastify', group: 'Backend' },
  { value: 'nestjs', label: 'NestJS', group: 'Backend' },
  { value: 'mongodb', label: 'MongoDB', group: 'Database' },
  { value: 'postgresql', label: 'PostgreSQL', group: 'Database' },
  { value: 'redis', label: 'Redis', group: 'Database' },
  { value: 'mysql', label: 'MySQL', group: 'Database' },
]

const optionsWithFixed: Option[] = [
  { value: 'admin', label: 'Admin', fixed: true },
  { value: 'user', label: 'User' },
  { value: 'moderator', label: 'Moderator' },
  { value: 'guest', label: 'Guest' },
  { value: 'developer', label: 'Developer' },
  { value: 'designer', label: 'Designer' },
]

/**
 * Basic usage of MultipleSelector with simple options.
 * This example shows the most common use case with a predefined list of options.
 */
export const Basic: Story = {
  render: () => {
    const [selected, setSelected] = useState<Option[]>([])

    return (
      <div className="w-80">
        <MultipleSelector
          value={selected}
          onChange={setSelected}
          options={basicOptions}
          placeholder="Select technologies..."
          emptyIndicator={
            <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
              No results found.
            </p>
          }
        />
      </div>
    )
  },
}

/**
 * MultipleSelector with pre-selected values.
 * Demonstrates how the component looks with initial selections.
 */
export const WithPreselectedValues: Story = {
  render: () => {
    const [selected, setSelected] = useState<Option[]>([
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue' },
      { value: 'nextjs', label: 'Next.js' },
    ])

    return (
      <div className="w-80">
        <MultipleSelector
          value={selected}
          onChange={setSelected}
          options={basicOptions}
          placeholder="Select technologies..."
          emptyIndicator={
            <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
              No results found.
            </p>
          }
        />
      </div>
    )
  },
}

/**
 * MultipleSelector with grouped options.
 * Shows how options can be organized by categories using the groupBy prop.
 */
export const WithGroupedOptions: Story = {
  render: () => {
    const [selected, setSelected] = useState<Option[]>([])

    return (
      <div className="w-80">
        <MultipleSelector
          value={selected}
          onChange={setSelected}
          options={groupedOptions}
          groupBy="group"
          placeholder="Select technologies..."
          emptyIndicator={
            <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
              No results found.
            </p>
          }
        />
      </div>
    )
  },
}

/**
 * MultipleSelector with fixed options.
 * Demonstrates options that cannot be removed once selected.
 */
export const WithFixedOptions: Story = {
  render: () => {
    const [selected, setSelected] = useState<Option[]>([{ ...optionsWithFixed[0], fixed: true }])

    return (
      <div className="w-80">
        <MultipleSelector
          value={selected}
          onChange={setSelected}
          options={optionsWithFixed}
          placeholder="Select roles..."
          emptyIndicator={
            <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
              No results found.
            </p>
          }
        />
      </div>
    )
  },
}

/**
 * MultipleSelector with maximum selection limit.
 * Shows how to limit the number of selections and handle the limit.
 */
export const WithMaxSelection: Story = {
  render: () => {
    const [selected, setSelected] = useState<Option[]>([])

    return (
      <div className="w-80">
        <MultipleSelector
          value={selected}
          onChange={setSelected}
          options={basicOptions}
          maxSelected={3}
          onMaxSelected={(maxLimit) => {
            // this is a storybook example
            // eslint-disable-next-line no-alert
            alert(`Maximum ${maxLimit} selections allowed`)
          }}
          placeholder="Select up to 3 technologies..."
          emptyIndicator={
            <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
              No results found.
            </p>
          }
        />
      </div>
    )
  },
}

/**
 * Disabled MultipleSelector.
 * Shows the component in a disabled state.
 */
export const Disabled: Story = {
  render: () => {
    const [selected, setSelected] = useState<Option[]>([
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue' },
    ])

    return (
      <div className="w-80">
        <MultipleSelector
          value={selected}
          onChange={setSelected}
          options={basicOptions}
          disabled
          placeholder="Select technologies..."
          emptyIndicator={
            <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
              No results found.
            </p>
          }
        />
      </div>
    )
  },
}

/**
 * MultipleSelector in loading state.
 * Shows the loading indicator while options are being fetched.
 */
export const Loading: Story = {
  render: () => {
    const [selected, setSelected] = useState<Option[]>([])

    return (
      <div className="w-80">
        <MultipleSelector
          value={selected}
          onChange={setSelected}
          options={basicOptions}
          isLoading
          placeholder="Loading technologies..."
          emptyIndicator={
            <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
              No results found.
            </p>
          }
        />
      </div>
    )
  },
}

/**
 * MultipleSelector with many selections.
 * Demonstrates overflow handling when many options are selected.
 */
export const WithManySelections: Story = {
  render: () => {
    const [selected, setSelected] = useState<Option[]>([
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue' },
      { value: 'angular', label: 'Angular' },
      { value: 'svelte', label: 'Svelte' },
      { value: 'nextjs', label: 'Next.js' },
      { value: 'nuxt', label: 'Nuxt' },
      { value: 'sveltekit', label: 'SvelteKit' },
      { value: 'remix', label: 'Remix' },
      { value: 'nodejs', label: 'Node.js' },
      { value: 'express', label: 'Express' },
    ])

    return (
      <div className="w-80">
        <MultipleSelector
          value={selected}
          onChange={setSelected}
          options={basicOptions}
          placeholder="Select technologies..."
          emptyIndicator={
            <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
              No results found.
            </p>
          }
        />
      </div>
    )
  },
}

/**
 * MultipleSelector without clear all button.
 * Shows the component with the clear all button hidden.
 */
export const WithoutClearAll: Story = {
  render: () => {
    const [selected, setSelected] = useState<Option[]>([
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue' },
    ])

    return (
      <div className="w-80">
        <MultipleSelector
          value={selected}
          onChange={setSelected}
          options={basicOptions}
          hideClearAllButton
          placeholder="Select technologies..."
          emptyIndicator={
            <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
              No results found.
            </p>
          }
        />
      </div>
    )
  },
}

/**
 * MultipleSelector with custom item renderer.
 * Demonstrates how to customize the appearance of individual selected items.
 */
export const WithCustomItemRenderer: Story = {
  render: () => {
    const [selected, setSelected] = useState<Option[]>([
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue' },
    ])

    const customItemRenderer: CustomItemRenderer = (
      option,
      badgeClassName,
      disabled,
      onUnselect,
    ) => {
      return (
        <div
          key={option.value}
          className={`${badgeClassName} relative inline-flex h-8 shrink-0 cursor-default items-center rounded-full border border-blue-200 bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 transition-all hover:bg-blue-200`}
        >
          <span className="mr-2">🚀</span>
          {typeof option.label === 'string' ? option.label : option.label}
          <button
            className="ml-2 text-blue-600 hover:text-blue-800"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onUnselect?.(option)
            }}
            disabled={disabled}
          >
            ×
          </button>
        </div>
      )
    }

    return (
      <div className="w-80">
        <MultipleSelector
          value={selected}
          onChange={setSelected}
          options={basicOptions}
          customItemRenderer={customItemRenderer}
          placeholder="Select technologies..."
          emptyIndicator={
            <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
              No results found.
            </p>
          }
        />
      </div>
    )
  },
}

/**
 * MultipleSelector with custom overflow renderer.
 * Shows how to customize the appearance of the overflow indicator.
 */
export const WithCustomOverflowRenderer: Story = {
  render: () => {
    const [selected, setSelected] = useState<Option[]>([
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue' },
      { value: 'angular', label: 'Angular' },
      { value: 'svelte', label: 'Svelte' },
      { value: 'nextjs', label: 'Next.js' },
      { value: 'nuxt', label: 'Nuxt' },
      { value: 'sveltekit', label: 'SvelteKit' },
      { value: 'remix', label: 'Remix' },
    ])

    const customOverflowRenderer: CustomOverflowRenderer = (overflowItems, badgeClassName) => {
      return (
        <div
          className={`${badgeClassName} relative inline-flex h-8 shrink-0 cursor-default items-center rounded-full border border-purple-200 bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800`}
        >
          <span className="mr-1">📦</span>+{overflowItems.length} more
        </div>
      )
    }

    return (
      <div className="w-80">
        <MultipleSelector
          value={selected}
          onChange={setSelected}
          options={basicOptions}
          customOverflowRenderer={customOverflowRenderer}
          placeholder="Select technologies..."
          emptyIndicator={
            <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
              No results found.
            </p>
          }
        />
      </div>
    )
  },
}

/**
 * MultipleSelector with both custom item and overflow renderers.
 * Demonstrates using both custom renderers together.
 */
export const WithCustomRenderers: Story = {
  render: () => {
    const [selected, setSelected] = useState<Option[]>([
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue' },
      { value: 'angular', label: 'Angular' },
      { value: 'svelte', label: 'Svelte' },
      { value: 'nextjs', label: 'Next.js' },
    ])

    const customItemRenderer: CustomItemRenderer = (
      option,
      badgeClassName,
      disabled,
      onUnselect,
    ) => {
      return (
        <div
          key={option.value}
          className={`${badgeClassName} relative inline-flex h-8 shrink-0 cursor-default items-center rounded-lg border border-green-200 bg-green-100 px-3 py-1 text-sm font-medium text-green-800 transition-all hover:bg-green-200`}
        >
          <span className="mr-2">✨</span>
          {typeof option.label === 'string' ? option.label : option.label}
          <button
            className="ml-2 text-green-600 hover:text-green-800"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onUnselect?.(option)
            }}
            disabled={disabled}
          >
            ×
          </button>
        </div>
      )
    }

    const customOverflowRenderer: CustomOverflowRenderer = (overflowItems, badgeClassName) => {
      return (
        <div
          className={`${badgeClassName} relative inline-flex h-8 shrink-0 cursor-default items-center rounded-lg border border-orange-200 bg-orange-100 px-3 py-1 text-sm font-medium text-orange-800`}
        >
          <span className="mr-1">🎯</span>+{overflowItems.length} others
        </div>
      )
    }

    return (
      <div className="w-80">
        <MultipleSelector
          value={selected}
          onChange={setSelected}
          options={basicOptions}
          customItemRenderer={customItemRenderer}
          customOverflowRenderer={customOverflowRenderer}
          placeholder="Select technologies..."
          emptyIndicator={
            <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
              No results found.
            </p>
          }
        />
      </div>
    )
  },
}
