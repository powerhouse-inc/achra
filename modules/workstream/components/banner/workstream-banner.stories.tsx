import { WorkstreamBanner } from './workstream-banner'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Workstream/Components/WorkstreamBanner',
  component: WorkstreamBanner,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/network/powerhouse',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundImage: {
      control: 'text',
      description: 'Optional URL or path for the banner background image',
    },
  },
} satisfies Meta<typeof WorkstreamBanner>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
