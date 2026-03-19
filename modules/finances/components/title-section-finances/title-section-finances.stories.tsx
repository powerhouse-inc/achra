import { TitleSectionFinances } from './title-section-finances'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Finances/Components/TitleSectionFinances',
  component: TitleSectionFinances,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    hash: { control: 'text' },
    range: { control: 'text' },
  },
} satisfies Meta<typeof TitleSectionFinances>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Breakdown Chart',
    hash: 'breakdown-chart',
    tooltipContent: 'This chart shows the budget breakdown by category.',
    range: 'Jan 2024 - Dec 2024',
  },
}
