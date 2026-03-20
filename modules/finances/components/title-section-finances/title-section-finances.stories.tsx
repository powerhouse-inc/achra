import { withPortalFontStyles } from '@/modules/shared/lib/decorators'
import { TitleSectionFinances } from './title-section-finances'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Finances/Components/TitleSectionFinances',
  component: TitleSectionFinances,
  decorators: [withPortalFontStyles],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Section title',
    },
    hash: {
      control: 'text',
      description: 'Anchor hash for the section',
    },
    tooltipContent: {
      control: 'text',
      description: 'Content shown in the tooltip info icon',
    },
    range: {
      control: 'text',
      description: 'Date range display',
    },
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
