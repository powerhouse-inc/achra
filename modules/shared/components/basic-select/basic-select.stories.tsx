import { BasicSelect } from './basic-select'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Shared/Components/SingleSelect',
  component: BasicSelect,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    onValueChange: () => {},
  },
  argTypes: {
    value: {
      control: 'text',
      description: 'Currently selected value (must match an option)',
    },
    options: {
      control: false,
      description: 'Array of options to display in the dropdown',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when no value is selected',
    },
    label: {
      control: 'text',
      description: 'Optional label for the select group',
    },
    onValueChange: { action: 'changed', description: 'Called when selection changes' },
    isLoading: {
      control: 'boolean',
      description: 'Shows loading skeleton in the trigger',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the select',
    },
  },
} satisfies Meta<typeof BasicSelect>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: 'Budget',
    options: ['Budget', 'Forecast', 'Actuals'],
    placeholder: 'Select type',
    'aria-label': 'Select budget type',
  },
}

export const Loading: Story = {
  args: {
    value: undefined,
    options: ['Monthly', 'Quarterly', 'Semi-annual', 'Annually'],
    placeholder: 'Select granularity',
    'aria-label': 'Select granularity',
    isLoading: true,
  },
}
