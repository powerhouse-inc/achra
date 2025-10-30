import { ExternalLinkIcon } from 'lucide-react'
import { DateTime } from 'luxon'
import type { Topic } from '@/modules/networks/lib/fetch-forum-posts'
import { Button } from '@/modules/shared/components/ui/button'
import ForumInfoChip from '../forum-info-chip/forum-info-chip'
import { Dot, forumCategories } from '../forum-overview/categories'

interface ForumPostProps {
  post: Topic
  isPopular?: boolean
}

function ForumPost({ post, isPopular = false }: ForumPostProps) {
  const date = DateTime.utc().diff(DateTime.fromISO(post.created_at), 'days').days
  const category = forumCategories.find((c) => c.id === post.category_id)

  return (
    <div className="bg-popover border-border grid grid-cols-1 gap-2 rounded-xl border p-2 md:grid-cols-[1fr_1fr] md:shadow-none lg:py-4 xl:pl-4 xl:md:grid-cols-[1fr_41%] 2xl:px-4">
      <div className="flex w-full flex-col gap-2 pb-2 md:pb-0">
        <div className="text-foreground text-xs/4.5 font-medium lg:text-sm/5.5 lg:font-semibold xl:text-base/6">
          {post.title}
        </div>
        <div className="flex flex-wrap gap-2">
          {category && (
            <div className="text-muted-foreground flex items-center gap-1 text-xs/4.5 font-medium xl:text-sm/5.5 xl:font-semibold">
              <span className="flex items-center gap-1">
                {category.id !== forumCategories[0].id ? (
                  category.icon
                ) : (
                  <Dot className="bg-destructive" />
                )}
                {category.category}
              </span>
            </div>
          )}
          {post.tags.map((tag) => (
            <div
              key={tag}
              className="text-muted-foreground flex items-center gap-1 text-xs/4.5 font-medium xl:text-sm/5.5 xl:font-semibold"
            >
              <Dot className="bg-foreground/30" /> {tag}
            </div>
          ))}
        </div>
      </div>
      <div className="flex w-full items-center gap-2 pt-2 md:justify-end md:pt-0 lg:gap-4">
        <div className="min-w-23.5 flex-1 md:w-fit md:py-2 lg:min-w-[110px]">
          <ForumInfoChip type="likes" value={post.like_count} popular={isPopular} />
        </div>
        <div className="flex-1 md:w-fit md:py-2 lg:min-w-[110px] xl:px-2">
          <ForumInfoChip type="replies" value={post.posts_count - 1} />
        </div>
        <div className="flex-1 md:w-fit md:py-2 lg:min-w-[110px] xl:px-2">
          <ForumInfoChip type="date" value={`${Math.floor(date)}d`} />
        </div>
        <div className="flex w-fit justify-end">
          <Button variant="outline" size="icon" asChild>
            <a
              href={`https://forum.makerdao.com/t/${post.slug}/${post.id}`}
              target="_blank"
              rel="noreferrer"
            >
              <span className="hidden">View</span>
              <ExternalLinkIcon className="size-4" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ForumPost
