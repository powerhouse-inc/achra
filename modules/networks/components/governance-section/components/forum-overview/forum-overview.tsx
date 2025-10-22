'use client'
import { useQuery } from '@tanstack/react-query'
import { ExternalLinkIcon } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { fetchForumPosts } from '@/modules/networks/lib/fetch-forum-posts'
import {
  StripedCard,
  StripedCardAction,
  StripedCardContent,
  StripedCardHeader,
  StripedCardTitle,
} from '@/modules/shared/components/striped-card'
import { Button } from '@/modules/shared/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/modules/shared/components/ui/tabs'
import ForumPost from '../forum-post/forum-post'
import ForumPostSkeleton from '../forum-post/forum-post-skeleton'
import { forumCategories } from './categories'
interface Topic {
  id: number
  slug: string
  title: string
  created_at: string
  category_id: number
  tags: string[]
  like_count: number
  posts_count: number
}

function ForumOverview() {
  const [activeTab, setActiveTab] = useState<string>(forumCategories[0].id.toString())

  const { isLoading, data, error } = useQuery<Topic[]>({
    queryKey: ['forum', activeTab],
    queryFn: async () => fetchForumPosts(activeTab),
    staleTime: Infinity,
  })
  const posts = data?.slice(0, 5)
  const biggerLikes = posts?.reduce(
    (acc, post) => (post.like_count > acc ? post.like_count : acc),
    0,
  )

  return (
    <Tabs
      value={activeTab}
      onValueChange={(tab) => {
        setActiveTab(tab)
      }}
      className="relative gap-0 overflow-hidden drop-shadow-lg"
    >
      <div className="from-background pointer-events-none absolute top-0 left-0 z-10 h-7.5 w-12.5 rounded-tl-lg bg-gradient-to-r to-transparent md:hidden" />
      <TabsList className="no-scrollbar h-fit w-full justify-start overflow-x-auto rounded-b-none bg-transparent p-0 md:overflow-x-visible">
        <div className="flex w-fit gap-2">
          {forumCategories.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.id.toString()}
              className="bg-background text-foreground/50 data-[state=active]:text-accent-foreground data-[state=active]:!bg-accent relative h-fit rounded-t-lg rounded-b-none border-0 px-4 text-sm/5.5 font-semibold data-[state=active]:shadow-none lg:text-base/6"
            >
              <div className="relative flex size-4 items-center">{category.icon}</div>
              {category.tabLabel}
            </TabsTrigger>
          ))}
        </div>
      </TabsList>
      {forumCategories.map((category) => (
        <TabsContent key={category.id} value={category.id.toString()}>
          <StripedCard className="w-full rounded-tl-none rounded-tr-none shadow-none md:rounded-tr-xl">
            <StripedCardHeader className="flex-col gap-2 px-4 py-2 md:flex-row md:justify-between xl:py-1 xl:pr-4 xl:pl-6">
              <StripedCardTitle>
                <p className="text-xs/4.5 font-medium lg:text-sm/5.5 lg:font-semibold">
                  <span className="text-accent-foreground/30">Sky Forum: </span>
                  Decision-making frameworks, including proposal discussions, voting mechanisms, and
                  policy updates.
                </p>
              </StripedCardTitle>
              <StripedCardAction className="self-start">
                <Button variant="outline" size="default" asChild>
                  <Link href="https://forum.makerdao.com/" target="_blank">
                    <span>Go to Forum</span>
                    <ExternalLinkIcon className="size-4" />
                  </Link>
                </Button>
              </StripedCardAction>
            </StripedCardHeader>
            <StripedCardContent className="flex flex-col gap-2 text-sm leading-5.5 font-semibold">
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
                <div className="text-foreground/50 text-sm/5.5 font-semibold">
                  Error fetching forum posts
                </div>
              )}
              {posts?.map((post) => (
                <ForumPost
                  key={post.id}
                  post={post}
                  isPopular={!!biggerLikes && post.like_count === biggerLikes}
                />
              ))}
            </StripedCardContent>
          </StripedCard>
        </TabsContent>
      ))}
    </Tabs>
  )
}

export default ForumOverview
