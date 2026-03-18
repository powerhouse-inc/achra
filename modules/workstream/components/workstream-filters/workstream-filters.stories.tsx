import { http, HttpResponse } from 'msw'
import type { AllNetworksQuery } from '@/modules/__generated__/graphql/switchboard-generated'
import { mockedNetworks } from '@/modules/networks/mocks/networks'
import { withNuqsAdapter, withReactQueryProvider } from '@/modules/shared/lib/decorators'
import WorkstreamFilters from './workstream-filters'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Workstream/Components/WorkstreamFilters',
  component: WorkstreamFilters,
  decorators: [withNuqsAdapter, withReactQueryProvider],
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/workstreams',
        query: {
          search: '',
          status: 'OPEN_FOR_PROPOSALS',
          network: 'all',
        },
      },
    },
  },
  argTypes: {},
} satisfies Meta<typeof WorkstreamFilters>

export default meta
type Story = StoryObj<typeof meta>

const mockedAllNetworksQuery: AllNetworksQuery = {
  __typename: 'Query',
  allNetworks: mockedNetworks.map((network) => ({
    __typename: 'AllNetworks',
    network: {
      ...network,
      slug: network.name?.toLowerCase().replace(/\s+/g, '-') ?? null,
    },
  })),
}

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
        http.post(process.env.NEXT_PUBLIC_SWITCHBOARD_URL, () => {
          return HttpResponse.json({
            data: mockedAllNetworksQuery,
          })
        }),
      ],
    },
  },
}
