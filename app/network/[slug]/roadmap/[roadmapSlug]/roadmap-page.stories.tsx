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
        pathname: '/network/powerhouse/roadmap/roadmap-1',
        params: {
          slug: 'powerhouse',
          roadmapSlug: 'roadmap-1',
        },
      },
    },
  },
} satisfies Meta<typeof RoadmapPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    params: Promise.resolve({
      slug: 'powerhouse',
      roadmapSlug: 'roadmap-1',
    }),
  },
}
