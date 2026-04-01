import { PROPOSALS } from '@/modules/networks/mocks/proposals'
import { ProposalsSection } from './proposals-section'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Networks/Components/ProposalsSection',
  component: ProposalsSection,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    proposals: {
      control: 'object',
      description: 'Array of proposal objects to display',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply to the section',
    },
  },
} satisfies Meta<typeof ProposalsSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    proposals: PROPOSALS,
  },
}

export const SingleProposal: Story = {
  args: {
    proposals: [PROPOSALS[0]],
  },
}

export const TwoProposals: Story = {
  args: {
    proposals: PROPOSALS.slice(0, 2),
  },
}
