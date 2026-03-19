import { withNuqsAdapter, withPortalFontStyles } from '@/modules/shared/lib/decorators'
import { BreakdownChartCard } from './breakdown-chart-card'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Finances/Components/BreakdownChartCard',
  component: BreakdownChartCard,
  decorators: [withNuqsAdapter, withPortalFontStyles],
  argTypes: {
    children: {
      control: false,
      description: 'Chart content to render inside the card',
    },
  },
  parameters: {
    layout: 'padded',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/finances',
      },
    },
  },
} satisfies Meta<typeof BreakdownChartCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <div className="bg-muted text-muted-foreground flex h-64 w-full items-center justify-center rounded-md">
        Chart content
      </div>
    ),
  },
}
