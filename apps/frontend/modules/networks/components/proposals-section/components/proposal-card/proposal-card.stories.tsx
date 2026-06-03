import { PROPOSALS } from '@/modules/networks/mocks/proposals'
import { withPortalFontStyles } from '@/modules/shared/lib/decorators'
import { ProposalCard } from './proposal-card'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Networks/Components/ProposalsSection/ProposalCard',
  component: ProposalCard,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/network/powerhouse',
      },
    },
  },
  decorators: [withPortalFontStyles],
  args: {
    ...PROPOSALS[0],
  },
} satisfies Meta<typeof ProposalCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const LongTitle: Story = {
  args: {
    id: '2',
    title: '4.2: Advanced Data Pipeline Architecture and Infrastructure Modernization',
    budget: '250,000 + 50,000 POWt',
    submissionDeadline: '30/06/2026',
    detailsHref: '/network/powerhouse',
  },
}
