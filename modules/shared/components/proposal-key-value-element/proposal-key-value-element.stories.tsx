import { CalendarIcon, DollarSign } from 'lucide-react'
import { ProposalKeyValueElement } from './proposal-key-value-element'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Shared/Components/ProposalKeyValueElement',
  component: ProposalKeyValueElement,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    keyValue: { control: 'text' },
    value: { control: 'text' },
  },
} satisfies Meta<typeof ProposalKeyValueElement>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    keyValue: 'Budget',
    keyIcon: DollarSign,
    value: '$50,000',
  },
}

export const WithDate: Story = {
  args: {
    keyValue: 'Deadline',
    keyIcon: CalendarIcon,
    value: '31 Dec 2025',
  },
}

export const LongValue: Story = {
  args: {
    keyValue: 'Description',
    keyIcon: DollarSign,
    value: 'Comprehensive market research and analysis report for Q1 2025',
  },
}
