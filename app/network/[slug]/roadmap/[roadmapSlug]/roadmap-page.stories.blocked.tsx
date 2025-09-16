// TODO: enable this story
// This story is blocked because RSC is not fully supported in Storybook
// there's an open issue here: https://github.com/storybookjs/storybook/issues/30317
import { http, HttpResponse } from 'msw'
import { mockedScopeOfWorkQuery } from '@/modules/roadmap/mocks/roadmap'
import { withReactServerComponentDecorator } from '@/modules/shared/config/rsc-decorator'
import RoadmapPage from './page'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta = {
  title: 'Achra/Pages/Roadmap',
  component: RoadmapPage,
  decorators: [withReactServerComponentDecorator],
  parameters: {
    includeLayout: true,
    nextjs: {
      appDirectory: true,
      router: {
        pathname: '/network/powerhouse/roadmap/powerhouse-2024',
        params: {
          slug: 'powerhouse',
          roadmapSlug: 'powerhouse-2024',
        },
      },
    },
  },
} satisfies Meta<typeof RoadmapPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
        http.post(process.env.NEXT_PUBLIC_SWITCHBOARD_URL, () => {
          return HttpResponse.json({
            data: mockedScopeOfWorkQuery,
          })
        }),
      ],
    },
  },
  args: {
    params: Promise.resolve({ roadmapSlug: 'powerhouse-2024' }),
  },
}
