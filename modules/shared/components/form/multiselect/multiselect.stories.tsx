import React, { useState } from 'react'
import { MultipleSelector, type Option } from './multiselect'
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
  { value: 'react', label: 'React', category: 'Frontend' },
  { value: 'vue', label: 'Vue', category: 'Frontend' },
  { value: 'angular', label: 'Angular', category: 'Frontend' },
  { value: 'svelte', label: 'Svelte', category: 'Frontend' },
  { value: 'nodejs', label: 'Node.js', category: 'Backend' },
  { value: 'express', label: 'Express', category: 'Backend' },
  { value: 'fastify', label: 'Fastify', category: 'Backend' },
  { value: 'nestjs', label: 'NestJS', category: 'Backend' },
  { value: 'mongodb', label: 'MongoDB', category: 'Database' },
  { value: 'postgresql', label: 'PostgreSQL', category: 'Database' },
  { value: 'redis', label: 'Redis', category: 'Database' },
  { value: 'mysql', label: 'MySQL', category: 'Database' },
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
          groupBy="category"
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
    const [selected, setSelected] = useState<Option[]>([
      { value: 'admin', label: 'Admin', fixed: true },
    ])

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
