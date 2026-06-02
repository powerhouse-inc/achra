import { mockProposal } from '@/modules/workstream/mocks/proposals'
import { InitialProposalSection } from './initial-proposal-section'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Workstream/Components/InitialProposalSection',
  component: InitialProposalSection,
  parameters: {
    layout: 'padded',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/network/powerhouse/workstream/powerhouse-workstream-2024',
      },
    },
  },
  args: {
    networkSlug: 'powerhouse',
    workstreamSlug: 'powerhouse-workstream-2024',
    proposal: mockProposal,
    milestones: 3,
    deliverables: 3,
    totalBudget: 1580000,
    projects: [],
  },
  argTypes: {
    networkSlug: { description: 'Slug of the network' },
    workstreamSlug: { description: 'Slug of the workstream' },
    proposal: { description: 'Initial proposal data or null when no proposal' },
    milestones: { description: 'Number of milestones in the roadmap' },
    deliverables: { description: 'Number of deliverables' },
    totalBudget: { description: 'Total budget amount' },
    projects: { description: 'Projects from the scope of work' },
    action: { description: 'Optional action element (e.g. button) to display' },
  },
} satisfies Meta<typeof InitialProposalSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const NoProposal: Story = {
  args: {
    proposal: null,
    milestones: 0,
    deliverables: 0,
    totalBudget: 0,
  },
}

export const WithAction: Story = {
  args: {
    action: <button className="rounded-md border px-3 py-1.5 text-sm">View Proposal</button>,
  },
}
