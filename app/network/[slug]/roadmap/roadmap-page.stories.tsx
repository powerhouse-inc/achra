import RoadmapPage from './page'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta = {
  title: 'Achra/Pages/Roadmap',
  component: RoadmapPage,
  parameters: {
    includeLayout: true,
    nextjs: {
      appDirectory: true,
      router: {
        pathname: '/network/powerhouse/roadmap',
        params: {
          slug: 'powerhouse',
        },
      },
    },
  },
} satisfies Meta<typeof RoadmapPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
