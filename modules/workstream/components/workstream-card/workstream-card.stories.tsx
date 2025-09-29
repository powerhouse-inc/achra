import WorkstreamCard from './workstream-card'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta = {
  title: 'Modules/Workstream/Components/WorkstreamCard',
  component: WorkstreamCard,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
  argTypes: {},
} satisfies Meta<typeof WorkstreamCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
