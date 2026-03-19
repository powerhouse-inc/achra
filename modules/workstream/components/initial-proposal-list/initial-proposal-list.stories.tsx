import { http, HttpResponse } from 'msw'
import { mockedProjectsQuery, mockedWorkstreamsQuery } from '@/modules/workstream/mocks'
import { InitialProposalList } from './initial-proposal-list'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Workstream/Components/InitialProposalList',
  component: InitialProposalList,
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
  argTypes: {
    params: {
      description: 'Promise resolving to network and workstream slugs from route params',
    },
  },
} satisfies Meta<typeof InitialProposalList>

export default meta
type Story = StoryObj<typeof meta>

const graphqlHandler = async ({ request }: { request: Request }) => {
  const body = (await request.json()) as { query?: string }
  const query = body.query ?? ''
  const data = query.includes('WorkstreamDetails')
    ? null
    : query.includes('Projects')
      ? mockedProjectsQuery
      : query.includes('Workstreams')
        ? mockedWorkstreamsQuery
        : null
  if (!data) return HttpResponse.json({ data: {} })
  return HttpResponse.json({ data })
}

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [http.post(process.env.NEXT_PUBLIC_SWITCHBOARD_URL, graphqlHandler)],
    },
  },
}
