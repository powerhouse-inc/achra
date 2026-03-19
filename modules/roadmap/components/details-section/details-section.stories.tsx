import {
  mockedContributors,
  mockedDeliverables,
  mockedProjects,
  mockedRoadmaps,
} from '@/modules/roadmap/mocks'
import { DetailsSection, DetailsSectionSkeleton } from './details-section'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Roadmap/Components/DetailsSection',
  component: DetailsSection,
  parameters: {
    layout: 'padded',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/network/powerhouse/roadmap',
      },
    },
  },
} satisfies Meta<typeof DetailsSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    roadmap: mockedRoadmaps[0],
    deliverables: mockedDeliverables,
    contributors: mockedContributors,
    projects: mockedProjects,
  },
}

export const Skeleton: StoryObj = {
  render: () => <DetailsSectionSkeleton />,
}
