import { mockedForumPosts } from '@/modules/networks/mocks/governance-section'
import { withNextjsExtras, withPortalFontStyles } from '@/modules/shared/lib/decorators'
import { ForumList } from './forum-list'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const maxLikes = Math.max(...mockedForumPosts.map((p) => p.like_count))

const meta = {
  title: 'Modules/Networks/Components/ForumList',
  component: ForumList,
  parameters: {
    layout: 'padded',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/network/powerhouse',
      },
    },
  },
  decorators: [withPortalFontStyles, withNextjsExtras],
  args: {
    posts: mockedForumPosts,
    biggerLikes: maxLikes,
    error: null,
    isLoading: false,
  },
} satisfies Meta<typeof ForumList>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Loading: Story = {
  args: {
    posts: [],
    biggerLikes: 0,
    error: null,
    isLoading: true,
  },
}

export const Empty: Story = {
  args: {
    posts: [],
    biggerLikes: 0,
    error: null,
    isLoading: false,
  },
}

export const WithError: Story = {
  args: {
    posts: [],
    biggerLikes: 0,
    error: new Error('Failed to load forum posts'),
    isLoading: false,
  },
}
