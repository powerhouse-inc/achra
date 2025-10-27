'use client'
import { useMemo, useRef, useState } from 'react'
import type { Topic } from '@/modules/networks/lib/fetch-forum-posts'
import ForumPost from '../forum-post/forum-post'

export interface ForumListProps {
  posts: Topic[]
  biggerLikes: number
}

interface MaxChipWidths {
  likes: number
  replies: number
  date: number
}

export interface MeasureChipParams {
  type: 'likes' | 'replies' | 'date'
  width: number
}

export function ForumList({ posts, biggerLikes }: ForumListProps) {
  const maxWidthsRef = useRef<MaxChipWidths>({
    likes: 0,
    replies: 0,
    date: 0,
  })
  const [maxWidths, setMaxWidths] = useState<MaxChipWidths>({
    likes: 0,
    replies: 0,
    date: 0,
  })

  const handleMeasureChip = ({ type, width }: MeasureChipParams) => {
    const current = maxWidthsRef.current[type]
    if (width > current) {
      const updated = { ...maxWidthsRef.current, [type]: width }
      maxWidthsRef.current = updated
      setMaxWidths(updated)
    }
  }

  const styleVars = useMemo(() => {
    const vars: React.CSSProperties = {}
    if (maxWidths.likes > 0)
      (vars as Record<string, string>)['--chip-width-likes'] = `${maxWidths.likes}px`
    if (maxWidths.replies > 0)
      (vars as Record<string, string>)['--chip-width-replies'] = `${maxWidths.replies}px`
    if (maxWidths.date > 0)
      (vars as Record<string, string>)['--chip-width-date'] = `${maxWidths.date}px`
    return vars
  }, [maxWidths.likes, maxWidths.replies, maxWidths.date])

  return (
    <div style={styleVars} className="flex flex-col gap-2">
      {posts.map((post) => (
        <ForumPost
          key={post.id}
          post={post}
          isPopular={!!biggerLikes && post.like_count === biggerLikes}
          onMeasureChip={handleMeasureChip}
        />
      ))}
    </div>
  )
}
