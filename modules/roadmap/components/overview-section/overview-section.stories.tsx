import { mockedRoadmaps } from '@/modules/roadmap/mocks'
import { OverviewSection, OverviewSectionSkeleton } from './overview-section'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Roadmap/Components/OverviewSection',
  component: OverviewSection,
  parameters: {
    layout: 'padded',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/network/powerhouse/roadmap',
      },
    },
  },
  argTypes: {
    roadmap: {
      control: false,
      description: 'The roadmap containing milestones for the timeline',
    },
  },
} satisfies Meta<typeof OverviewSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    roadmap: mockedRoadmaps[0],
  },
}

export const UndefinedRoadmap: Story = {
  args: {
    roadmap: undefined,
  },
}

export const Skeleton: StoryObj<typeof meta> = {
  args: {
    roadmap: undefined,
  },
  render: () => <OverviewSectionSkeleton />,
}
