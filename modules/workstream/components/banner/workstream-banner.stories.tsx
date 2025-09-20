import WorkstreamBanner from './workstream-banner'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta = {
  title: 'Modules/Workstream/Components/WorkstreamBanner',
  component: WorkstreamBanner,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {},
} satisfies Meta<typeof WorkstreamBanner>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
