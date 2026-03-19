import { http, HttpResponse } from 'msw'
import { withNuqsAdapter, withReactQueryProvider } from '@/modules/shared/lib/decorators'
import { mockedAllNetworksQuery } from '@/modules/workstream/mocks'
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
  argTypes: {
    showNetworkFilter: {
      control: 'boolean',
      description: 'Whether to show the network filter dropdown',
    },
  },
} satisfies Meta<typeof WorkstreamFilters>

export default meta
type Story = StoryObj<typeof meta>

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
