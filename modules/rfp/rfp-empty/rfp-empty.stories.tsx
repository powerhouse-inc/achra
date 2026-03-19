import { RfpEmpty } from './rfp-empty'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/RFP/Components/RfpEmpty',
  component: RfpEmpty,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
  },
} satisfies Meta<typeof RfpEmpty>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'No request for proposal found',
    description: 'No request for proposal found for this workstream.',
  },
}

export const CustomMessage: Story = {
  args: {
    title: 'No RFPs available',
    description: 'There are no open requests for proposals at this time. Check back later.',
  },
}
