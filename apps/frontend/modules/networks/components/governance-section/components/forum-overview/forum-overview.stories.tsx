import { delay, http, HttpResponse } from 'msw'
import { mockedForumPosts } from '@/modules/networks/mocks/governance-section'
import { BASE_URL } from '@/modules/shared/lib/constants'
import { withReactQueryProvider } from '@/modules/shared/lib/decorators'
import { forumCategories } from './categories'
import { ForumOverview } from './forum-overview'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

/**
 * ForumOverview displays forum posts from the Sky Forum organized by category tabs.
 * It fetches and displays the top 5 posts for each category with pagination support.
 *
 * Features:
 * - Tabbed interface for different forum categories
 * - Real-time data fetching with React Query
 * - Loading and error states
 * - Highlights most popular posts
 * - External links to full forum posts
 *
 * @component
 */
const meta = {
  title: 'Modules/Networks/Components/GovernanceSection/ForumOverview',
  component: ForumOverview,
  parameters: {
    layout: 'padded',
    mockingDate: new Date(2025, 10, 1),
    docs: {
      description: {
        component:
          'Displays forum posts from Sky Forum organized by category tabs: Popular, Onboarding, Finances, Governance, and Atlas.',
      },
    },
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/network/powerhouse',
      },
    },
  },
  decorators: [withReactQueryProvider],
} satisfies Meta<typeof ForumOverview>

export default meta
type Story = StoryObj<typeof meta>

// Helper to filter posts by category
const getPostsByCategory = (categoryId: number) =>
  mockedForumPosts.filter((post) => post.category_id === categoryId)

const FORUM_API_URL = new URL('/api/forum', BASE_URL).toString()

// Generic handler that returns posts based on the `id` query param
const forumRequestHandler = ({ request }: { request: Request }) => {
  const url = new URL(request.url)
  const categoryId = url.searchParams.get('id')
  const posts = categoryId
    ? getPostsByCategory(parseInt(categoryId))
    : mockedForumPosts.filter((post) => post.category_id === forumCategories[0].id)
  return HttpResponse.json(posts)
}

/**
 * Default state showing Popular tab (General Discussion category).
 * Displays the most recent posts with engagement metrics.
 */
export const Default: Story = {
  parameters: {
    msw: {
      handlers: [http.get(FORUM_API_URL, forumRequestHandler)],
    },
  },
}

/**
 * Loading state while fetching forum posts.
 * Shows skeleton loaders for 5 posts.
 */
export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(FORUM_API_URL, async () => {
          await delay('infinite')
        }),
      ],
    },
  },
}

/**
 * Error state when the API request fails.
 * Displays an error message to the user.
 */
export const Error: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(FORUM_API_URL, () => {
          return HttpResponse.error()
        }),
      ],
    },
  },
}

/**
 * Empty state when a category has no posts.
 * Shows the header but no post content.
 */
export const EmptyCategory: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(FORUM_API_URL, () => {
          return HttpResponse.json([])
        }),
      ],
    },
  },
}

/**
 * Shows a category with many posts with high engagement.
 * Demonstrates the popular post highlighting feature.
 */
export const HighEngagement: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(FORUM_API_URL, () => {
          return HttpResponse.json([
            {
              id: 1,
              title: 'Important Governance Update - Q4 2025',
              slug: 'important-governance-update-q4-2025',
              posts_count: 45,
              created_at: '2025-10-01T12:00:00.000Z',
              tags: ['governance', 'important'],
              like_count: 128,
              category_id: 89,
            },
            {
              id: 2,
              title: 'New Proposal: SKY Token Economics',
              slug: 'new-proposal-sky-token-economics',
              posts_count: 32,
              created_at: '2025-10-02T14:30:00.000Z',
              tags: ['proposal', 'economics'],
              like_count: 95,
              category_id: 89,
            },
            {
              id: 3,
              title: 'Community Call Summary - September',
              slug: 'community-call-summary-september',
              posts_count: 18,
              created_at: '2025-10-03T10:15:00.000Z',
              tags: ['community'],
              like_count: 67,
              category_id: 89,
            },
            {
              id: 4,
              title: 'DeFi Integration Discussion',
              slug: 'defi-integration-discussion',
              posts_count: 28,
              created_at: '2025-10-04T16:45:00.000Z',
              tags: ['defi', 'integration'],
              like_count: 54,
              category_id: 89,
            },
            {
              id: 5,
              title: 'Treasury Management Best Practices',
              slug: 'treasury-management-best-practices',
              posts_count: 22,
              created_at: '2025-10-05T09:20:00.000Z',
              tags: ['treasury', 'best-practices'],
              like_count: 43,
              category_id: 89,
            },
          ])
        }),
      ],
    },
  },
}

/**
 * Simulates slow network conditions.
 * Useful for testing loading states and user patience.
 */
export const SlowNetwork: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(FORUM_API_URL, async ({ request }) => {
          const url = new URL(request.url)
          const categoryId = url.searchParams.get('id')
          const posts = categoryId ? getPostsByCategory(parseInt(categoryId)) : []
          await delay(3000)
          return HttpResponse.json(posts)
        }),
      ],
    },
  },
}
