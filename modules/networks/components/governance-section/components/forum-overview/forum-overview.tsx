'use client'
import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/modules/shared/components/ui/tabs'
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
  const posts: Topic[] = []
  const biggerLikes = posts.reduce(
    (acc, post) => (post.like_count > acc ? post.like_count : acc),
    0,
  )

  return (
    <Tabs
      value={activeTab}
      onValueChange={(v) => {
        setActiveTab(v)
      }}
    >
      <TabsList className="no-scrollbar -mx-2 h-fit w-full justify-start overflow-x-auto bg-transparent p-0">
        <div className="flex w-fit gap-2 py-4 pl-2 xl:py-6">
          {forumCategories.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.id.toString()}
              className="text-foreground/50 data-[state=active]:text-accent-foreground data-[state=active]:!bg-accent h-fit rounded-t-lg rounded-b-none border-0 px-4 text-sm/5.5 font-semibold shadow-lg data-[state=active]:shadow-lg lg:text-base/6"
            >
              <div className="relative flex size-4 items-center">{category.icon}</div>
              {category.tabLabel}
            </TabsTrigger>
          ))}
        </div>
      </TabsList>
      {forumCategories.map((category) => (
        <TabsContent key={category.id} value={category.id.toString()}>
          {/* Note: In Progress */}
          {posts.slice(0, 5).map((post) => (
            <div key={post.id}>
              <div>{post.title}</div>
              <div>{biggerLikes}</div>
            </div>
          ))}
        </TabsContent>
      ))}
    </Tabs>
  )
}

export default ForumOverview
