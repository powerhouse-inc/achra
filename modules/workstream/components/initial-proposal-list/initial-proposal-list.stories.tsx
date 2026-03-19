import { withNextjsExtras } from '@/modules/shared/lib/decorators'
import { InitialProposalList } from './initial-proposal-list'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Workstream/Components/InitialProposalList',
  component: InitialProposalList,
  decorators: [withNextjsExtras],
  parameters: {
    layout: 'padded',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/network/sky/workstream/finance-team',
      },
    },
  },
  args: {
    params: Promise.resolve({ slug: 'sky', workstreamSlug: 'finance-team' }),
  },
} satisfies Meta<typeof InitialProposalList>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
