import React, { useState } from 'react'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { DrawerSelect, FilterDrawer } from './filter-drawer'
import type { Meta, StoryObj } from '@storybook/nextjs'

/**
 * FilterDrawer is a specialized drawer component designed for filtering interfaces.
 * It provides a consistent way to display filter options in a mobile-friendly drawer format.
 *
 * Features:
 * - Customizable trigger button or custom trigger element
 * - Built-in reset functionality with optional reset button
 * - Accessible with proper ARIA labels and screen reader support
 * - Responsive design optimized for mobile and desktop
 *
 * @component
 */
const meta = {
  title: 'Shared/Components/Filter Drawer',
  component: FilterDrawer,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A specialized drawer component for filtering interfaces with customizable trigger and reset functionality.',
      },
    },
  },
  argTypes: {
    onReset: {
      description: 'Function called when the reset button is clicked',
      action: 'reset',
    },
    filterTrigger: {
      description: 'Custom trigger element to replace the default filter button',
      control: false,
    },
    children: {
      description: 'Filter content to display inside the drawer',
      control: false,
    },
  },
} satisfies Meta<typeof FilterDrawer>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Basic usage of FilterDrawer with default trigger button.
 * This example shows the simplest implementation with a reset function.
 */
export const Basic: Story = {
  render: () => {
    const [filters, setFilters] = useState({
      status: 'all',
      network: 'all',
    })

    const handleReset = () => {
      setFilters({ status: 'all', network: 'all' })
    }

    return (
      <FilterDrawer onReset={handleReset}>
        <DrawerSelect
          label="Status"
          value={filters.status}
          onChange={(value) => {
            setFilters((prev) => ({ ...prev, status: value }))
          }}
          options={[
            { label: 'All', value: 'all' },
            { label: 'Active', value: 'active' },
            { label: 'Completed', value: 'completed' },
            { label: 'Paused', value: 'paused' },
          ]}
        />
        <DrawerSelect
          label="Network"
          value={filters.network}
          onChange={(value) => {
            setFilters((prev) => ({ ...prev, network: value }))
          }}
          options={[
            { label: 'All Networks', value: 'all' },
            { label: 'Grove', value: 'grove' },
            { label: 'Sky', value: 'sky' },
            { label: 'Spark', value: 'spark' },
          ]}
        />
      </FilterDrawer>
    )
  },
}

/**
 * FilterDrawer with a custom trigger button.
 * Demonstrates how to use a custom trigger element instead of the default filter icon.
 */
export const CustomTrigger: Story = {
  render: () => {
    const [filters, setFilters] = useState({
      category: 'all',
      priority: 'all',
    })

    const handleReset = () => {
      setFilters({ category: 'all', priority: 'all' })
    }

    const activeFiltersCount = Object.values(filters).filter((value) => value !== 'all').length

    return (
      <FilterDrawer
        onReset={handleReset}
        filterTrigger={
          <Button variant="outline" className="gap-2">
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-1">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>
        }
      >
        <DrawerSelect
          label="Category"
          value={filters.category}
          onChange={(value) => {
            setFilters((prev) => ({ ...prev, category: value }))
          }}
          options={[
            { label: 'All Categories', value: 'all' },
            { label: 'Development', value: 'development' },
            { label: 'Design', value: 'design' },
            { label: 'Marketing', value: 'marketing' },
            { label: 'Research', value: 'research' },
          ]}
        />
        <DrawerSelect
          label="Priority"
          value={filters.priority}
          onChange={(value) => {
            setFilters((prev) => ({ ...prev, priority: value }))
          }}
          options={[
            { label: 'All Priorities', value: 'all' },
            { label: 'High', value: 'high' },
            { label: 'Medium', value: 'medium' },
            { label: 'Low', value: 'low' },
          ]}
        />
      </FilterDrawer>
    )
  },
}

/**
 * FilterDrawer without reset functionality.
 * Shows how the component behaves when no reset function is provided.
 */
export const WithoutReset: Story = {
  render: () => {
    const [filters, setFilters] = useState({
      type: 'all',
    })

    return (
      <FilterDrawer>
        <DrawerSelect
          label="Type"
          value={filters.type}
          onChange={(value) => {
            setFilters((prev) => ({ ...prev, type: value }))
          }}
          options={[
            { label: 'All Types', value: 'all' },
            { label: 'Feature', value: 'feature' },
            { label: 'Bug Fix', value: 'bug' },
            { label: 'Enhancement', value: 'enhancement' },
          ]}
        />
      </FilterDrawer>
    )
  },
}

/**
 * Complex filter example with multiple filter types.
 * Demonstrates a more realistic use case with various filter options.
 */
export const ComplexFilters: Story = {
  render: () => {
    const [filters, setFilters] = useState({
      status: 'all',
      network: 'all',
      priority: 'all',
      dateRange: 'all',
    })

    const handleReset = () => {
      setFilters({
        status: 'all',
        network: 'all',
        priority: 'all',
        dateRange: 'all',
      })
    }

    const activeFiltersCount = Object.values(filters).filter((value) => value !== 'all').length

    return (
      <FilterDrawer
        onReset={handleReset}
        filterTrigger={
          <Button variant="outline" className="gap-2">
            <span>Advanced Filters</span>
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-1">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>
        }
      >
        <DrawerSelect
          label="Status"
          value={filters.status}
          onChange={(value) => {
            setFilters((prev) => ({ ...prev, status: value }))
          }}
          options={[
            { label: 'All Statuses', value: 'all' },
            { label: 'Active', value: 'active' },
            { label: 'Completed', value: 'completed' },
            { label: 'Paused', value: 'paused' },
            { label: 'Cancelled', value: 'cancelled' },
          ]}
        />
        <DrawerSelect
          label="Network"
          value={filters.network}
          onChange={(value) => {
            setFilters((prev) => ({ ...prev, network: value }))
          }}
          options={[
            { label: 'All Networks', value: 'all' },
            { label: 'Grove', value: 'grove' },
            { label: 'Sky', value: 'sky' },
            { label: 'Spark', value: 'spark' },
            { label: 'Powerhouse', value: 'powerhouse' },
          ]}
        />
        <DrawerSelect
          label="Priority"
          value={filters.priority}
          onChange={(value) => {
            setFilters((prev) => ({ ...prev, priority: value }))
          }}
          options={[
            { label: 'All Priorities', value: 'all' },
            { label: 'Critical', value: 'critical' },
            { label: 'High', value: 'high' },
            { label: 'Medium', value: 'medium' },
            { label: 'Low', value: 'low' },
          ]}
        />
        <DrawerSelect
          label="Date Range"
          value={filters.dateRange}
          onChange={(value) => {
            setFilters((prev) => ({ ...prev, dateRange: value }))
          }}
          options={[
            { label: 'All Time', value: 'all' },
            { label: 'Last 7 days', value: '7d' },
            { label: 'Last 30 days', value: '30d' },
            { label: 'Last 3 months', value: '3m' },
            { label: 'Last year', value: '1y' },
          ]}
        />
      </FilterDrawer>
    )
  },
}

/**
 * DrawerSelect component documentation and examples.
 *
 * DrawerSelect is a specialized select component designed for use within drawers.
 * It provides a clean, accessible interface for single-selection filtering.
 *
 * Features:
 * - Generic type support for type-safe option values
 * - Customizable labels and option content
 * - Visual feedback for selected state
 * - Hover states for better UX
 * - Accessible keyboard navigation
 *
 * @component
 */
export const DrawerSelectExamples: Story = {
  render: () => {
    const [selectedValue, setSelectedValue] = useState('option2')

    return (
      <div className="space-y-4 p-4">
        <h3 className="text-lg font-semibold">DrawerSelect Examples</h3>

        <DrawerSelect
          label="Simple Options"
          value={selectedValue}
          onChange={setSelectedValue}
          options={[
            { label: 'Option 1', value: 'option1' },
            { label: 'Option 2', value: 'option2' },
            { label: 'Option 3', value: 'option3' },
          ]}
        />

        <DrawerSelect
          label="With Custom Content"
          value="custom1"
          onChange={() => {}}
          options={[
            {
              label: (
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span>Active</span>
                </div>
              ),
              value: 'custom1',
            },
            {
              label: (
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-yellow-500" />
                  <span>Pending</span>
                </div>
              ),
              value: 'custom2',
            },
            {
              label: (
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-red-500" />
                  <span>Inactive</span>
                </div>
              ),
              value: 'custom3',
            },
          ]}
        />
      </div>
    )
  },
}
