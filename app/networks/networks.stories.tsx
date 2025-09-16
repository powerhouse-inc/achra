import { http, HttpResponse } from 'msw'
import { mockedNetworks } from '@/modules/networks/mocks/networks'
import { withReactServerComponentDecorator } from '@/modules/shared/config/rsc-decorator'
import NetworksPage from './page'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta = {
  title: 'Achra/Pages/Networks',
  component: NetworksPage,
  decorators: [withReactServerComponentDecorator],
  parameters: {
    includeLayout: true,
    nextjs: {
      appDirectory: true,
      router: {
        pathname: '/networks',
      },
    },
    msw: {
      handlers: [
        http.post(process.env.NEXT_PUBLIC_SWITCHBOARD_URL, () => {
          return HttpResponse.json({
            data: {
              NetworkProfile: {
                getDocument: {
                  state: mockedNetworks[0],
                },
              },
            },
          })
        }),
      ],
    },
  },
} satisfies Meta<typeof NetworksPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
