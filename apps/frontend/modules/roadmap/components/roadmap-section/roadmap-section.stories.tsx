import { mockedSowDeliverables, mockedSowRoadmap } from '@/modules/roadmap/mocks'
import { RoadmapSection } from './roadmap-section'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Roadmap/Components/RoadmapSection',
  component: RoadmapSection,
  parameters: {
    layout: 'padded',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname:
          '/network/powerhouse/workstream/powerhouse-workstream-2024/roadmap/powerhouse-team-2024-roadmap-af7da134',
      },
    },
  },
  argTypes: {
    roadmap: {
      control: false,
      description: 'The roadmap data with milestones',
    },
    network: {
      control: false,
      description: 'Optional network info for header display',
    },
    workstreamSlug: {
      control: 'text',
      description: 'Workstream slug for navigation',
    },
    workstreamTitle: {
      control: 'text',
      description: 'Workstream title for display',
    },
    deliverables: {
      control: false,
      description: 'Array of deliverables',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
} satisfies Meta<typeof RoadmapSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    roadmap: mockedSowRoadmap,
    workstreamSlug: 'powerhouse-workstream-2024',
    workstreamTitle: 'Powerhouse Workstream 2024',
    deliverables: mockedSowDeliverables,
  },
}

export const WithNetwork: Story = {
  args: {
    roadmap: mockedSowRoadmap,
    network: {
      name: 'Powerhouse',
      logo: 'https://pbs.twimg.com/profile_images/1663915112837652480/pUIOaWoC_400x400.jpg',
      darkThemeLogo: null,
      slug: 'powerhouse',
    },
    workstreamSlug: 'powerhouse-workstream-2024',
    workstreamTitle: 'Powerhouse Workstream 2024',
    deliverables: mockedSowDeliverables,
  },
}
