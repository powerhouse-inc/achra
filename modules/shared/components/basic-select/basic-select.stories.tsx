import { BasicSelect } from './basic-select'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta: Meta<typeof BasicSelect> = {
  title: 'Shared/Components/SingleSelect',
  component: BasicSelect,
  tags: ['autodocs'],
  argTypes: {
    onValueChange: { action: 'changed' },
  },
}

export default meta
type Story = StoryObj<typeof BasicSelect>

export const Budget: Story = {
  args: {
    value: 'Budget',
    options: ['Budget', 'Forecast', 'Actuals'],
    placeholder: 'Select type',
    'aria-label': 'Select budget type',
  },
}

export const Granularity: Story = {
  args: {
    value: 'Monthly',
    options: ['Monthly', 'Quarterly', 'Semi-annual', 'Annually'],
    label: 'Granularity',
    placeholder: 'Select granularity',
    'aria-label': 'Select granularity',
  },
}
