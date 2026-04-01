import type { Topic } from '@/modules/networks/types'
import { SmartErrorState } from '@/modules/shared/components/error-state'
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from '@/modules/shared/components/ui/empty'
import ForumPost from '../forum-post/forum-post'
import ForumPostSkeleton from '../forum-post/forum-post-skeleton'

export interface ForumListProps {
  posts: Topic[]
  biggerLikes: number
  error: Error | null
  isLoading: boolean
}

export interface MeasureChipParams {
  type: 'likes' | 'replies' | 'date'
  width: number
  reset?: boolean
}

export function ForumList({ posts, biggerLikes, error, isLoading }: ForumListProps) {
  return (
    <div className="flex flex-col gap-2">
      {isLoading && (
        <>
          <ForumPostSkeleton />
          <ForumPostSkeleton />
          <ForumPostSkeleton />
          <ForumPostSkeleton />
          <ForumPostSkeleton />
        </>
      )}
      {error && (
        <SmartErrorState
          title="Error loading forum posts"
          description="We ran into an unexpected error while loading the forum posts. Please try again later."
          showBorder={false}
        />
      )}
      {!isLoading && !error && posts.length === 0 ? (
        <Empty>
          <EmptyHeader>
            <EmptyTitle>No posts found</EmptyTitle>
            <EmptyDescription>There are no posts to display at this time.</EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        posts.map((post) => (
          <ForumPost
            key={post.id}
            post={post}
            isPopular={!!biggerLikes && post.like_count === biggerLikes}
          />
        ))
      )}
    </div>
  )
}
