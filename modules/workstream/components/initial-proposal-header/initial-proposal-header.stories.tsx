import { ProposalStatus } from '@/modules/__generated__/graphql/switchboard-generated'
import { withNextjsExtras } from '@/modules/shared/lib/decorators'
import InitialProposalHeader from './initial-proposal-header'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Workstream/Components/InitialProposalHeader',
  component: InitialProposalHeader,
  decorators: [withNextjsExtras],
  parameters: {
    layout: 'padded',
  },
  args: {
    proposalStatus: ProposalStatus.Submitted,
    proposalAuthor: 'Jane Smith',
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

export const DraftStatus: Story = {
  args: {
    proposalStatus: ProposalStatus.Draft,
    proposalAuthor: 'John Doe',
  },
}

export const AcceptedStatus: Story = {
  args: {
    proposalStatus: ProposalStatus.Accepted,
    proposalAuthor: 'Alice Johnson',
  },
}

export const NoAuthor: Story = {
  args: {
    proposalStatus: ProposalStatus.Submitted,
    proposalAuthor: undefined,
  },
}
