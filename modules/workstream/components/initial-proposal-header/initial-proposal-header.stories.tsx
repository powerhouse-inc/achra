import { ProposalStatus } from '@/modules/__generated__/graphql/switchboard-generated'
import InitialProposalHeader from './initial-proposal-header'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Workstream/Components/InitialProposalHeader',
  component: InitialProposalHeader,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  args: {
    proposalStatus: ProposalStatus.Submitted,
    proposalAuthor: 'Jane Smith',
  },
  argTypes: {
    proposalStatus: {
      control: 'select',
      options: Object.values(ProposalStatus),
      description: 'Status of the initial proposal',
    },
    proposalAuthor: {
      control: 'text',
      description: 'Name of the proposal author',
    },
    action: {
      description: 'Optional action element (e.g. button) to display',
    },
  },
} satisfies Meta<typeof InitialProposalHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithAction: Story = {
  args: {
    action: <button className="rounded-md border px-3 py-1.5 text-sm">View Proposal</button>,
  },
}

export const NoAuthor: Story = {
  args: {
    proposalStatus: ProposalStatus.Submitted,
    proposalAuthor: undefined,
  },
}
