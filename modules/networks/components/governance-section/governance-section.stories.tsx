import { http, HttpResponse } from 'msw'
import { mockedForumPosts } from '@/modules/networks/mocks/governance-section'
import { BASE_URL } from '@/modules/shared/config/constants'
import {
  withNextjsExtras,
  withPortalFontStyles,
  withReactQueryProvider,
} from '@/modules/shared/lib/decorators'
import { GovernanceSection } from './governance-section'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const FORUM_API_URL = new URL('/api/forum', BASE_URL).toString()
const MAKERVOTE_EXECUTIVE_URL = 'https://vote.makerdao.com/api/executive'

const meta = {
  title: 'Modules/Networks/Components/GovernanceSection',
  component: GovernanceSection,
  parameters: {
    layout: 'padded',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/network/powerhouse',
      },
    },
    msw: {
      handlers: [
        http.get(FORUM_API_URL, ({ request }) => {
          const url = new URL(request.url)
          const categoryId = url.searchParams.get('id')
          const posts = categoryId
            ? mockedForumPosts.filter((p) => p.category_id === parseInt(categoryId))
            : mockedForumPosts
          return HttpResponse.json(posts)
        }),
        http.get(MAKERVOTE_EXECUTIVE_URL, () => {
          return HttpResponse.json([])
        }),
      ],
    },
  },
  decorators: [withReactQueryProvider, withPortalFontStyles, withNextjsExtras],
} satisfies Meta<typeof GovernanceSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
